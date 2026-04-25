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
