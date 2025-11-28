import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Content from "./pages/Content";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Sponsors from "./pages/Sponsors";
import Donations from "./pages/Donations";
import Classes from "./pages/Classes";
import SocialLinksPage from "./pages/SocialLinksPage";
import LanguageSelect from "./pages/LanguageSelect";
import RafflePopup from "./components/RafflePopup";
import NotFound from "@/pages/not-found";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/sobre" component={About} />
      <Route path="/conteudo" component={Content} />
      <Route path="/projetos" component={Projects} />
      <Route path="/contato" component={Contact} />
      <Route path="/patrocinadores" component={Sponsors} />
      <Route path="/doacoes" component={DonationsPage} />
      <Route path="/classes" component={Classes} />
      <Route path="/redes-sociais" component={SocialLinksPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function DonationsPage() {
  const { language } = useLanguage();
  return <Donations language={language} />;
}

function AppContent() {
  const { isLanguageSelected, completeLanguageSelection } = useLanguage();

  if (!isLanguageSelected) {
    return <LanguageSelect onComplete={completeLanguageSelection} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16 md:pt-20">
        <Router />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AppContent />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  );
}

export default App;
