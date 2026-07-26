import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { StudentLayout } from "../../components/layout/StudentLayout";
import { Badge } from "../../components/ui/Badge";
import { Icon } from "../../components/common/Icon";
import { EmptyState } from "../../components/ui/EmptyState";
import { api } from "../../services/api";

export const Route = createFileRoute("/dashboard/live-classes")({
  component: () => (
    <StudentLayout activeItem="/dashboard/live-classes">
      <StudentLiveClasses />
    </StudentLayout>
  ),
});

function StudentLiveClasses() {
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/live-classes")
      .then((res) => {
        if (res.success) {
          setClasses(res.classes || []);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const live = classes.filter((c) => c.status === "LIVE");
  const scheduled = classes.filter((c) => c.status === "SCHEDULED");

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-display font-bold text-on-background mb-2">Live Teaching Calls</h1>
        <p className="text-on-surface-variant text-sm">
          Join scheduled class sessions, participate in video sessions, and use collaborative notes with your teacher.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12 animate-pulse text-on-surface-variant">Loading class schedule...</div>
      ) : (
        <div className="space-y-8">
          {/* Active / LIVE Classes */}
          {live.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-success flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-success animate-ping" />
                Live Classes Right Now
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {live.map((c) => (
                  <div
                    key={c._id}
                    className="bg-success-container/10 border border-success/30 rounded-2xl p-6 shark-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="success">LIVE NOW</Badge>
                        <span className="text-xs text-on-surface-variant font-medium">
                          Duration: {c.duration} mins
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-on-surface mb-1">{c.title}</h3>
                      {c.description && <p className="text-sm text-on-surface-variant mb-3">{c.description}</p>}
                      <p className="text-xs text-on-surface-variant flex items-center gap-1">
                        <Icon name="person" className="text-[14px]" />
                        <span className="font-semibold text-on-surface">Teacher:</span> {c.teacher?.name}
                      </p>
                    </div>
                    <Link
                      to="/live-class/$id"
                      params={{ id: c._id }}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-success text-white rounded-xl font-bold text-sm hover:opacity-95 transition-opacity"
                    >
                      <Icon name="video_call" /> Join Class Room
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Scheduled / Upcoming Classes */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-on-surface">Upcoming Schedule</h2>
            {scheduled.length === 0 ? (
              <div className="bg-surface-container-lowest border border-outline-variant/35 rounded-2xl p-12 text-center">
                <Icon name="calendar_today" className="text-4xl text-on-surface-variant/40 mb-3 block mx-auto" />
                <p className="font-bold text-on-surface text-sm mb-1">No Upcoming Classes</p>
                <p className="text-xs text-on-surface-variant">There are no classes scheduled for the coming days.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {scheduled.map((c) => (
                  <div
                    key={c._id}
                    className="bg-surface-container-lowest border border-outline-variant/35 rounded-2xl p-5 shark-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-outline-variant transition-colors"
                  >
                    <div>
                      <h3 className="font-bold text-on-surface text-base mb-1">{c.title}</h3>
                      {c.description && <p className="text-xs text-on-surface-variant mb-3 line-clamp-1">{c.description}</p>}
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-on-surface-variant">
                        <span className="flex items-center gap-1">
                          <Icon name="calendar_today" className="text-[14px] text-primary" />
                          {new Date(c.scheduledAt).toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="schedule" className="text-[14px] text-primary" />
                          {c.duration} mins
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="person" className="text-[14px] text-primary" />
                          Teacher: {c.teacher?.name}
                        </span>
                      </div>
                    </div>
                    
                    <button
                      disabled
                      className="w-full sm:w-auto px-5 py-2.5 bg-surface-container-high text-on-surface-variant rounded-xl font-bold text-xs cursor-not-allowed border-none"
                    >
                      Class Not Started
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
