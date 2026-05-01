import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { useEffect, useRef, useState } from "react";
import { getSessions } from "../services/sessionService";

export default function Calendar() {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const updateCalendarHeight = () => {
      const navbar = document.querySelector("header");
      const navbarHeight = navbar?.getBoundingClientRect().height ?? 0;
      const availableHeight = Math.max(window.innerHeight - navbarHeight, 320);

      calendarRef.current?.getApi().setOption("height", availableHeight);
    };

    updateCalendarHeight();
    window.addEventListener("resize", updateCalendarHeight);

    return () => window.removeEventListener("resize", updateCalendarHeight);
  }, []);

  useEffect(() => {
    async function fetchSessions() {
      try {
        const sessions = await getSessions();

        const calendarEvents = (sessions || []).map((session) => {
          const title =
            session.day?.name || session.program?.name || "Workout Session";

          return {
            title: session.status === "completed" ? `${title} (done)` : title,
            start: session.startTime.split("T")[0],
            allDay: true,
          };
        });

        setEvents(calendarEvents);
      } catch (err) {
        console.error("Failed to load sessions", err);
        setEvents([]);
      }
    }

    fetchSessions();
  }, []);

  return (
    <div className="calendar-wrapper">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        expandRows={true}
        events={events}
      />
    </div>
  );
}
