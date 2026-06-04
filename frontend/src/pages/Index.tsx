import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LandingPage from "@/components/LandingPage";
import Dashboard from "@/components/Dashboard";
import { AnimatePresence, motion } from "framer-motion";

interface IndexProps {
  initialTab?: string;
}

export default function Index({ initialTab }: IndexProps) {
  const [isStarted, setIsStarted] = useState(Boolean(initialTab));
  const location = useLocation();
  const navigate = useNavigate();

  const handleBack = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
    setIsStarted(false);
  };

  return (
    <AnimatePresence mode="wait">
      {!isStarted ? (
        <motion.div key="landing" exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.3 }}>
          <LandingPage onStart={() => setIsStarted(true)} />
        </motion.div>
      ) : (
        <motion.div key="dashboard" initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
          <Dashboard onBack={handleBack} initialTab={initialTab} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
