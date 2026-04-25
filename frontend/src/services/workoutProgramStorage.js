const STORAGE_KEY = "fitness-tracker.workout-programs";

const readPrograms = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const createProgram = async ({ userId }) => {
  const res = await fetch(`/api/programs/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  return res.json();
};

export const createDay = async (programId, day) => {
  const res = await fetch(`/api/programs/${programId}/days`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(day),
  });

  return res.json();
}

const writePrograms = (programs) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(programs));
};

export const listPrograms = () =>
  readPrograms().sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

export const getProgramById = (id) =>
  readPrograms().find((program) => program.id === id) || null;

export const createProgram = (programData) => {
  const now = new Date().toISOString();
  const id =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  const newProgram = {
    ...programData,
    id,
    createdAt: now,
    updatedAt: now,
  };

  const programs = readPrograms();
  writePrograms([...programs, newProgram]);

  return newProgram;
};

export const updateProgram = (programId, updates) => {
  const programs = readPrograms();
  const updatedPrograms = programs.map((program) => {
    if (program.id !== programId) return program;

    return {
      ...program,
      ...updates,
      id: program.id,
      createdAt: program.createdAt,
      updatedAt: new Date().toISOString(),
    };
  });

  writePrograms(updatedPrograms);

  return updatedPrograms.find((program) => program.id === programId) || null;
};

export const deleteProgram = (programId) => {
  const programs = readPrograms();
  const filteredPrograms = programs.filter((program) => program.id !== programId);
  const wasDeleted = filteredPrograms.length !== programs.length;

  if (wasDeleted) {
    writePrograms(filteredPrograms);
  }

  return wasDeleted;
};


// In progress:
// const handleSubmit = async (event) => {
//   event.preventDefault();

//   const cleanDays = days.map((day) => ({
//     exercises: day.exercises
//       .filter((exercise) => exercise.name.trim())
//       .map((exercise) => ({
//         name: exercise.name.trim(),
//         sets: Number(exercise.sets),
//         reps: Number(exercise.reps),
//       })),
//   })).filter((day) => day.exercises.length > 0);

//   if (!programName.trim()) {
//     setErrorMessage("Program name is required.");
//     return;
//   }

//   if (cleanDays.length === 0) {
//     setErrorMessage("At least one day with exercises is required.");
//     return;
//   }

//   try{
//     const program = await createProgram({ userId: 1 });
//   }
// }