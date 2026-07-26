import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { Icon } from "../components/common/Icon";
import { Header } from "../components/layout/Header";
import { Badge } from "../components/ui/Badge";

export const Route = createFileRoute("/live-class/$id")({
  component: LiveClassRoom,
});

declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

function LiveClassRoom() {
  const { id } = Route.useParams();
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [classSession, setClassSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const jitsiContainerRef = useRef<HTMLDivElement>(null);
  const jitsiApiRef = useRef<any>(null);

  // Fetch Class Details
  useEffect(() => {
    api.get(`/api/live-classes/${id}`)
      .then((res) => {
        if (res.success) {
          setClassSession(res.liveClass);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // Load Jitsi External API Script dynamically
  useEffect(() => {
    if (loading || !classSession) return;

    // Load Jitsi external API if not already loaded
    const domain = "meet.systemli.org";
    if (!window.JitsiMeetExternalAPI) {
      const script = document.createElement("script");
      script.src = `https://${domain}/external_api.js`;
      script.async = true;
      script.onload = () => initJitsi();
      document.body.appendChild(script);
    } else {
      initJitsi();
    }

    return () => {
      if (jitsiApiRef.current) {
        jitsiApiRef.current.dispose();
      }
    };
  }, [loading, classSession]);

  const initJitsi = () => {
    if (!jitsiContainerRef.current || !classSession) return;

    // Dispose existing Jitsi instance if any
    if (jitsiApiRef.current) {
      jitsiApiRef.current.dispose();
    }

    const domain = "meet.systemli.org";
    const options = {
      roomName: classSession.roomName,
      width: "100%",
      height: "100%",
      parentNode: jitsiContainerRef.current,
      userInfo: {
        displayName: user?.name || "Participant",
        email: user?.email || "",
      },
      configOverwrite: {
        startWithAudioMuted: false,
        startWithVideoMuted: true,
        prejoinPageEnabled: false,
        openBridgeToContent: true,
        // Etherpad shared document configuration
        etherpad_base: "https://etherpad.meet.jit.si/p/",
        // Enable whiteboard
        whiteboard: {
          enabled: true,
          collaborative: true,
        },
      },
      interfaceConfigOverwrite: {
        SHOW_JITSI_WATERMARK: false,
        SHOW_BRAND_WATERMARK: false,
        MOBILE_APP_PROMO: false,
        SHOW_CHROME_EXTENSION_BANNER: false,
      },
    };

    jitsiApiRef.current = new window.JitsiMeetExternalAPI(domain, options);
  };

  const handleEndClass = async () => {
    if (!confirm("Are you sure you want to end this live class session?")) return;
    try {
      const res = await api.put(`/api/live-classes/${id}/status`, { status: "COMPLETED" });
      if (res.success) {
        if (jitsiApiRef.current) {
          jitsiApiRef.current.dispose();
        }
        // Redirect based on role
        if (user?.role === "ADMIN") {
          navigate({ to: "/admin/classes" });
        } else if (user?.role === "TEACHER") {
          navigate({ to: "/teacher/classes" });
        } else {
          navigate({ to: "/dashboard/live-classes" });
        }
      }
    } catch (err) {
      alert("Failed to end class session.");
    }
  };

  const handleFullscreen = () => {
    if (jitsiContainerRef.current) {
      if (jitsiContainerRef.current.requestFullscreen) {
        jitsiContainerRef.current.requestFullscreen();
      }
    }
  };

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-on-surface-variant font-semibold animate-pulse">Loading live room details...</div>
        </div>
      </div>
    );
  }

  if (!classSession) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <Icon name="error" className="text-5xl text-error mb-4" />
          <h2 className="text-xl font-bold text-on-surface mb-2">Class Not Found</h2>
          <p className="text-sm text-on-surface-variant mb-6">The requested live call session does not exist or has been deleted.</p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2.5 bg-primary text-on-primary font-semibold rounded-xl text-sm hover:bg-accent transition-colors border-none cursor-pointer"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  console.log("isTeacherOrAdmin Check:", {
    userRole: user?.role,
    classTeacher: classSession.teacher,
    userIdsToCheck: {
      id: user?.id,
      _id: user?._id,
      userId: user?.userId
    }
  });

  const isTeacherOrAdmin = user?.role === "ADMIN" || (user?.role === "TEACHER" && String(classSession.teacher?._id || classSession.teacher) === String(user?.id || user?._id || user?.userId));

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <Header />
      
      {/* Session Action Header */}
      <div className="bg-surface-container-low border-b border-outline-variant/30 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="p-2 rounded-lg hover:bg-surface-container-high transition-colors cursor-pointer border-none bg-transparent text-on-surface"
          >
            <Icon name="arrow_back" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-on-surface flex items-center gap-2">
              {classSession.title}
              <Badge variant={classSession.status === "LIVE" ? "success" : "info"}>
                {classSession.status}
              </Badge>
            </h1>
            <p className="text-xs text-on-surface-variant">
              Teacher: {classSession.teacher?.name} • Room ID: {classSession.roomName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleFullscreen}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-surface-container-high text-on-surface font-bold text-xs rounded-xl hover:bg-surface-container-highest transition-colors border-none cursor-pointer"
          >
            <Icon name="fullscreen" />
            Full Screen
          </button>
          {isTeacherOrAdmin && classSession.status === "LIVE" && (
            <button
              onClick={handleEndClass}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-error text-white font-bold text-xs rounded-xl hover:opacity-90 transition-opacity border-none cursor-pointer"
            >
              <Icon name="check_circle" />
              End & Complete Class
            </button>
          )}
        </div>
      </div>

      {/* Embedded Iframe Container */}
      <div className="w-full bg-black relative" style={{ minHeight: "80vh", height: "800px" }}>
        <div ref={jitsiContainerRef} className="w-full h-full absolute inset-0" />
      </div>
    </div>
  );
}
