import React, { useState, useEffect, useRef } from 'react';
import { Video, Mic, MicOff, VideoOff, PhoneOff } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';

const Telemedicine: React.FC = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const { addNotification } = useNotifications();

  useEffect(() => {
    if (isCallActive) {
      // In a real implementation, you would set up WebRTC here
      // For this example, we'll just simulate a connection
      addNotification('Connecting to your healthcare provider...', 'info');
      setTimeout(() => {
        addNotification('Connected to Dr. Smith', 'success');
      }, 3000);
    }
  }, [isCallActive, addNotification]);

  const startCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      setIsCallActive(true);
    } catch (error) {
      console.error('Error accessing media devices:', error);
      addNotification('Failed to access camera and microphone', 'error');
    }
  };

  const endCall = () => {
    setIsCallActive(false);
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const tracks = (localVideoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
    addNotification('Call ended', 'info');
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      (localVideoRef.current.srcObject as MediaStream).getAudioTracks().forEach(track => {
        track.enabled = isMuted;
      });
    }
  };

  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff);
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      (localVideoRef.current.srcObject as MediaStream).getVideoTracks().forEach(track => {
        track.enabled = isVideoOff;
      });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-6">Telemedicine Consultation</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-200 rounded-lg overflow-hidden aspect-video">
          <video ref={localVideoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
        </div>
        <div className="bg-gray-200 rounded-lg overflow-hidden aspect-video">
          <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="mt-4 flex justify-center space-x-4">
        {!isCallActive ? (
          <button
            onClick={startCall}
            className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            aria-label="Start call"
          >
            <Video className="inline-block mr-2" /> Start Call
          </button>
        ) : (
          <>
            <button
              onClick={toggleMute}
              className={`${isMuted ? 'bg-red-500' : 'bg-blue-500'} text-white p-2 rounded-full hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <MicOff /> : <Mic />}
            </button>
            <button
              onClick={toggleVideo}
              className={`${isVideoOff ? 'bg-red-500' : 'bg-blue-500'} text-white p-2 rounded-full hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
              aria-label={isVideoOff ? 'Turn video on' : 'Turn video off'}
            >
              {isVideoOff ? <VideoOff /> : <Video />}
            </button>
            <button
              onClick={endCall}
              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              aria-label="End call"
            >
              <PhoneOff />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Telemedicine;

