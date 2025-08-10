import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Feed from "@/components/Feed";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-screen">
          <Feed />
        </main>
      </div>
    </div>
  );
};

export default Index;
