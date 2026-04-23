import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

export default function Calendar() {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={[
        { title: "aloysious birthday", date: "2026-04-01" },
        { title: "jia rui birthday", date: "2026-04-02" },
        { title: "nicholas birthday", date: "2026-04-03" },
      ]}
    />
  );
}
