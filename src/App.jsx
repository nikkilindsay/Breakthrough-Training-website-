import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Programs from './pages/Programs';
import ProgramDetail from './pages/ProgramDetail';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Instructors from './pages/Instructors';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import Enroll from './pages/Enroll';
import Success from './pages/Success';
import Payment from './pages/Payment';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Careers from './pages/Careers';
import HowToPay from './pages/HowToPay';
import FAQ from './pages/FAQ';
import ClassSchedule from './pages/ClassSchedule';
import Scholarship from './pages/Scholarship';
import RequestInfo from './pages/RequestInfo';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/programs/:id" element={<ProgramDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/instructors" element={<Instructors />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/enroll" element={<Enroll />} />
            <Route path="/checkout/:programId" element={<Checkout />} />
            <Route path="/pay" element={<Payment />} />
            <Route path="/success" element={<Success />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/how-to-pay" element={<HowToPay />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/class-schedule" element={<ClassSchedule />} />
            <Route path="/scholarship" element={<Scholarship />} />
            <Route path="/request-info" element={<RequestInfo />} />
            <Route path="/info" element={<Navigate to="/request-info" replace />} />
            <Route path="/start" element={<Navigate to="/request-info" replace />} />
            <Route path="/about" element={<Navigate to="/instructors" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
