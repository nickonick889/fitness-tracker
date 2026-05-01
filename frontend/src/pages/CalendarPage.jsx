import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSessions } from "../services/sessionService";
import { getPrograms } from "../services/programService";

export default function Calendar() {
  const calendarRef = useRef(null);
  const navigate = useNavigate();
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
        const [sessions, programs] = await Promise.all([
          getSessions(),
          getPrograms(),
        ]);

        const programMap = (programs || []).reduce((acc, p) => {
          acc[p._id] = p.name;
          return acc;
        }, {});

        const mappedEvents = (sessions || []).map((session) => {
          const dayName = session.day?.name || "Workout";

          const programName =
            session.program?.name ||
            programMap?.[session.program] ||
            "";

          const baseTitle = programName
            ? `${dayName} - ${programName}`
            : dayName;

          return {
            id: session._id,

            title: baseTitle,

            start: session.startTime.split("T")[0],
            allDay: true,

            extendedProps: {
              sessionId: session._id,
            },
          };
        });

        setEvents(mappedEvents);

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
        eventClick={(info) => {
            const sessionId = info.event.extendedProps.sessionId;

            if (sessionId) {
              navigate(`/session/${sessionId}`);
            }
          }}

          dateClick={(info) => {
            navigate(`/history?date=${info.dateStr}`);
          }}      
      />
    </div>
  );
}
