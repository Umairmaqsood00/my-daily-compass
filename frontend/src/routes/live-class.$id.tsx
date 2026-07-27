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
  const [isSecure, setIsSecure] = useState(true);
  const [jitsiActive, setJitsiActive] = useState(false);
  const [teacherJoinedState, setTeacherJoinedState] = useState(false);
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  const jitsiContainerRef = useRef<HTMLDivElement>(null);
  const jitsiApiRef = useRef<any>(null);

  const isTeacherOrAdmin = user?.role === "ADMIN" || (user?.role === "TEACHER" && classSession && String(classSession.teacher?._id || classSession.teacher) === String(user?.id || user?._id || user?.userId));

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsSecure(window.isSecureContext);
    }
  }, []);

  // Fetch Class Details & handle polling for students
  useEffect(() => {
    let interval: any;

    const fetchClass = () => {
      api.get(`/api/live-classes/${id}`)
        .then((res) => {
          if (res.success) {
            setClassSession(res.liveClass);
            setTeacherJoinedState(res.liveClass.teacherJoined);
            
            // If the user is a student and the teacher is not in the room yet, start polling
            const isTeacher = user?.role === "ADMIN" || (user?.role === "TEACHER" && String(res.liveClass.teacher?._id || res.liveClass.teacher) === String(user?.id || user?._id || user?.userId));
            if (!isTeacher && !res.liveClass.teacherJoined && !interval) {
              interval = setInterval(fetchClass, 5000);
            } else if (res.liveClass.teacherJoined && interval) {
              clearInterval(interval);
            }
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    };

    fetchClass();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [id, user]);

  // Load Jitsi External API Script dynamically
  useEffect(() => {
    if (loading || !classSession) return;
    // For students, wait for the teacher to join
    if (!isTeacherOrAdmin && !teacherJoinedState) return;

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
        setJitsiActive(false);
      }
      if (isTeacherOrAdmin) {
        api.put(`/api/live-classes/${id}/teacher-joined`, { teacherJoined: false })
          .catch(err => console.error("Error setting teacher left status:", err));
      }
    };
  }, [loading, classSession, teacherJoinedState]);

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
        // Enable whiteboard with public Cloudflare excalidraw server
        whiteboard: {
          enabled: true,
          collaborative: true,
          collabServerBaseUrl: "https://excalidraw-backend.cloudflare.jitsi.net",
        },
        toolbarButtons: isTeacherOrAdmin
          ? [
              'microphone', 'camera', 'closedcaptions', 'desktop', 'embedmeeting',
              'fullscreen', 'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
              'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
              'videoquality', 'filmstrip', 'feedback', 'stats', 'shortcuts',
              'tileview', 'select-background', 'help', 'mute-everyone', 'mute-video-everyone',
              'security', 'whiteboard'
            ]
          : [
              'microphone', 'camera', 'closedcaptions', 'desktop',
              'fullscreen', 'fodeviceselection', 'hangup', 'profile', 'chat',
              'settings', 'raisehand', 'videoquality', 'filmstrip',
              'tileview', 'select-background', 'help', 'whiteboard'
            ],
        disableRemoteMute: !isTeacherOrAdmin,
        remoteVideoSettings: {
          disableKick: !isTeacherOrAdmin,
        },
      },
      interfaceConfigOverwrite: {
        SHOW_JITSI_WATERMARK: false,
        SHOW_BRAND_WATERMARK: false,
        MOBILE_APP_PROMO: false,
        SHOW_CHROME_EXTENSION_BANNER: false,
        TOOLBAR_BUTTONS: isTeacherOrAdmin
          ? [
              'microphone', 'camera', 'closedcaptions', 'desktop', 'embedmeeting',
              'fullscreen', 'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
              'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
              'videoquality', 'filmstrip', 'feedback', 'stats', 'shortcuts',
              'tileview', 'select-background', 'help', 'mute-everyone', 'mute-video-everyone',
              'security', 'whiteboard'
            ]
          : [
              'microphone', 'camera', 'closedcaptions', 'desktop',
              'fullscreen', 'fodeviceselection', 'hangup', 'profile', 'chat',
              'settings', 'raisehand', 'videoquality', 'filmstrip',
              'tileview', 'select-background', 'help', 'whiteboard'
            ],
      },
    };

    jitsiApiRef.current = new window.JitsiMeetExternalAPI(domain, options);
    setJitsiActive(true);

    if (isTeacherOrAdmin) {
      api.put(`/api/live-classes/${id}/teacher-joined`, { teacherJoined: true })
        .catch(err => console.error("Error setting teacher joined status:", err));
    }
  };

  const handleEndClass = async () => {
    if (!confirm("Are you sure you want to end this live class session?")) return;
    try {
      const res = await api.put(`/api/live-classes/${id}/status`, { status: "COMPLETED" });
      if (res.success) {
        if (jitsiApiRef.current) {
          jitsiApiRef.current.dispose();
          setJitsiActive(false);
        }
        if (isTeacherOrAdmin) {
          api.put(`/api/live-classes/${id}/teacher-joined`, { teacherJoined: false })
            .catch(err => console.error("Error resetting teacher status:", err));
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
          {jitsiActive && isTeacherOrAdmin && (
            <>
              <button
                onClick={() => jitsiApiRef.current?.executeCommand("toggleShareScreen")}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-primary/10 text-primary border border-primary/20 font-bold text-xs rounded-xl hover:bg-primary/25 transition-colors cursor-pointer"
              >
                <Icon name="screen_share" />
                Share Screen
              </button>
              <button
                onClick={() => setShowWhiteboard(v => !v)}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 font-bold text-xs rounded-xl transition-all border-none cursor-pointer ${
                  showWhiteboard
                    ? "bg-accent text-white shadow-lg ring-2 ring-accent/40"
                    : "bg-accent text-white hover:opacity-90"
                }`}
              >
                <Icon name="gesture" />
                {showWhiteboard ? "Close Whiteboard" : "Open Whiteboard"}
              </button>
            </>
          )}
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

      {!isSecure && (
        <div className="bg-error/15 border-b border-error/20 px-6 py-4 flex items-center gap-3 animate-fade-in text-error">
          <Icon name="warning" className="text-xl shrink-0" />
          <div className="text-xs md:text-sm font-medium">
            <strong>Secure Context Required:</strong> WebRTC camera/microphone access is disabled by your browser because this site is accessed via an insecure connection (e.g. local IP address). Please access using <strong>http://localhost:5173</strong> or configure HTTPS.
          </div>
        </div>
      )}
 
      {/* Embedded Iframe Container */}
      <div className="w-full bg-black relative" style={{ minHeight: "80vh", height: "800px" }}>
        {!isTeacherOrAdmin && !teacherJoinedState ? (
          <div className="w-full h-full absolute inset-0 flex flex-col items-center justify-center p-8 bg-surface-container-lowest text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <Icon name="person" className="text-3xl text-primary animate-bounce" />
            </div>
            <h2 className="text-2xl font-bold text-on-surface mb-2">Waiting for the Teacher</h2>
            <p className="text-sm text-on-surface-variant max-w-md mb-6">
              The live class has not started yet. Please wait for the teacher to join the call. The session will automatically load once they arrive.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-primary/70">
              <span className="w-2.5 h-2.5 bg-primary rounded-full animate-ping" />
              Polling for teacher connection...
            </div>
          </div>
        ) : (
          <div ref={jitsiContainerRef} className="w-full h-full absolute inset-0" />
        )}

        {/* Custom Whiteboard Overlay - fully independent of Jitsi server */}
        {showWhiteboard && (
          <div
            className="absolute inset-0 z-50 flex flex-col"
            style={{ background: "rgba(0,0,0,0.85)" }}
          >
            {/* Whiteboard toolbar */}
            <div className="flex items-center justify-between px-4 py-2 bg-surface-container border-b border-outline-variant/40 shrink-0">
              <div className="flex items-center gap-2">
                <Icon name="gesture" className="text-accent" />
                <span className="text-sm font-bold text-on-surface">Collaborative Whiteboard</span>
                <span className="text-xs text-on-surface-variant">(powered by WBO)</span>
              </div>
              <button
                onClick={() => setShowWhiteboard(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-error text-white text-xs font-bold rounded-lg border-none cursor-pointer hover:opacity-90 transition-opacity"
              >
                <Icon name="close" />
                Close Whiteboard
              </button>
            </div>
            {/* WBO board embed - use a unique room per class session */}
            <iframe
              src={`https://wbo.ophir.dev/boards/${classSession.roomName}`}
              className="flex-1 w-full border-none bg-white"
              title="Collaborative Whiteboard"
            />
          </div>
        )}
      </div>
    </div>
  );
}
