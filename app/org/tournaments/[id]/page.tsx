"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeftIcon,
  ShareIcon,
  EllipsisIcon,
  UsersIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  TrophyIcon,
  CheckIcon,
  FilterIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  TrashIcon,
  PlusIcon,
} from "@/components/Icons";

// ==========================================
// 1. SHARED HEADER & LAYOUT COMPONENTS
// ==========================================

const TopAppBar = () => (
  <div className="flex items-center justify-between">
    <Link
      href="/org/tournaments"
      className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-800 border border-gray-100"
    >
      <ArrowLeftIcon size={20} />
    </Link>
    <div className="flex gap-3">
      <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-800 border border-gray-100">
        <ShareIcon size={18} />
      </button>
      <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-800 border border-gray-100">
        <EllipsisIcon size={20} />
      </button>
    </div>
  </div>
);

const EventHeader = () => (
  <div className="flex gap-3 items-center">
    <div className="w-12 h-12 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center overflow-hidden shrink-0">
      <TrophyIcon size={24} className="text-gray-500" />
    </div>
    <div>
      <h1 className="font-semibold text-lg leading-tight text-gray-900">
        Mumbai Men&apos;s 2025
      </h1>
      <p className="text-sm text-gray-500 mt-0.5">Andheri West Organization</p>
    </div>
  </div>
);

const EventStats = () => (
  <div className="grid grid-cols-2 gap-3">
    <div className="rounded-xl bg-white p-4 flex gap-3 items-center shadow-sm border border-gray-100">
      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 shrink-0">
        <UsersIcon size={20} />
      </div>
      <div>
        <p className="text-lg font-semibold text-gray-900 leading-tight">64</p>
        <p className="text-sm text-gray-500">Registered</p>
      </div>
    </div>
    <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
      <p className="font-medium text-gray-900 text-sm mb-2">Registration</p>
      <div className="flex gap-2">
        <button className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex-1 transition-transform active:scale-95">
          Open
        </button>
        <button className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium flex-1 transition-transform active:scale-95">
          Close
        </button>
      </div>
    </div>
  </div>
);

const PrimaryTabs = ({
  tabs,
  activeTab,
  setActiveTab,
}: {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => (
  <div className="flex justify-center my-2">
    <div className="flex gap-1 bg-gray-100 p-1 rounded-full overflow-x-auto scrollbar-hide max-w-full items-center">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeTab === tab
              ? "bg-orange-500 text-white shadow-sm"
              : "text-gray-500 bg-transparent hover:text-gray-700"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  </div>
);

// ==========================================
// 2. ABOUT TAB COMPONENTS
// ==========================================

const AboutTab = () => (
  <>
    <div className="bg-white rounded-xl p-4 space-y-4 shadow-sm border border-gray-100">
      <h2 className="font-semibold text-gray-900">Overview</h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="border border-gray-100 rounded-xl p-3 bg-gray-50/50">
          <p className="text-xs text-gray-500 mb-1">Start Date</p>
          <p className="text-sm font-medium text-gray-900">31 Dec 2025, 24:00</p>
        </div>
        <div className="border border-gray-100 rounded-xl p-3 bg-gray-50/50">
          <p className="text-xs text-gray-500 mb-1">End Date</p>
          <p className="text-sm font-medium text-gray-900">05 Jan 2026, 20:00</p>
        </div>
        <div className="border border-gray-100 rounded-xl p-3 bg-gray-50/50 col-span-2 flex gap-3 items-start">
          <MapPinIcon size={18} className="text-gray-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-gray-500 mb-1">Venue</p>
            <p className="text-sm font-medium text-gray-900 leading-snug">
              Andheri Sports Complex, Veera Desai Road, Mumbai
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mt-4">
      <h2 className="font-semibold text-gray-900 mb-2">Description</h2>
      <p className="text-sm text-gray-600 leading-relaxed">
        Join the biggest Pickleball tournament in the city. Open to all men&apos;s
        and all city athletes. Experience state-of-the-art courts, competitive
        matches, and a chance to win amazing prizes.
      </p>
    </div>

    <div className="bg-white rounded-xl p-4 space-y-4 shadow-sm border border-gray-100 mt-4">
      <h2 className="font-semibold text-gray-900">Contact Information</h2>
      <div className="space-y-3">
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shrink-0 border border-gray-200">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=PM&backgroundColor=f97316&textColor=ffffff`}
              alt="Piyush Mantri"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="font-medium text-gray-900">Piyush Mantri</p>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600 ml-1">
          <PhoneIcon size={16} className="text-gray-400 shrink-0" />
          <p>+91 99212 48196</p>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600 ml-1">
          <MailIcon size={16} className="text-gray-400 shrink-0" />
          <p>Email2019123@gmail.com</p>
        </div>
      </div>
    </div>
  </>
);

// ==========================================
// 3. EVENTS TAB COMPONENTS
// ==========================================

const StepRow = ({
  title, state, subtext, actionLabel, href, isLast = false,
}: any) => {
  const isCompleted = state === "completed";
  const isActive = state === "active";
  const isInactive = state === "inactive";

  const buttonClass = `px-3 py-1.5 rounded-full text-xs font-medium text-center transition-all inline-block ${
    isCompleted ? "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
      : isActive ? "bg-orange-500 text-white hover:bg-orange-600 shadow-sm"
      : "bg-gray-100 text-gray-400 cursor-not-allowed"
  }`;

  return (
    <div className="flex gap-3 relative">
      <div className="flex flex-col items-center w-5 shrink-0">
        <div className={`w-5 h-5 rounded-full flex items-center justify-center z-10 ${
            isCompleted ? "bg-green-500 text-white" : isActive ? "bg-orange-500 border-2 border-orange-500" : "bg-white border-2 border-gray-300"
          }`}>
          {isCompleted && <CheckIcon size={12} />}
        </div>
        {!isLast && <div className={`w-px flex-1 my-1 border-l-2 ${isCompleted ? "border-green-500" : "border-dashed border-gray-200"}`} />}
      </div>
      <div className="flex justify-between w-full items-center pb-5 -mt-0.5">
        <div>
          <p className={`font-medium text-sm ${isInactive ? "text-gray-500" : "text-gray-900"}`}>{title}</p>
          {subtext && <p className="text-xs text-gray-500 mt-0.5">{subtext}</p>}
        </div>
        {isInactive || !href ? (
          <button disabled className={buttonClass}>{isCompleted ? "View" : isActive ? actionLabel || "Manage" : "Not Started"}</button>
        ) : (
          <Link href={href} className={buttonClass}>{isCompleted ? "View" : isActive ? actionLabel || "Manage" : "Not Started"}</Link>
        )}
      </div>
    </div>
  );
};

const EventsTab = ({ tournamentId }: { tournamentId: string }) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Upcoming", "Past", "Ongoing"];
  const event = {
    id: "1", title: "Pickle Ball Men's", subInfo: "Under 20 | 26 Dec 2025, 9:00 AM", status: "pending", quickAction: "Now, you can manage your matches.", participantCount: 36,
    steps: { participants: "completed", fixtures: "completed", matches: "active" }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
        {filters.map((filter) => (
          <button key={filter} onClick={() => setActiveFilter(filter)} className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeFilter === filter ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{filter}</button>
        ))}
      </div>
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-gray-900">{event.title}</h3>
            <p className="text-sm text-gray-500 mt-0.5">{event.subInfo}</p>
          </div>
          <button className="text-gray-400"><EllipsisIcon size={20} /></button>
        </div>
        <div className="flex justify-between items-center mb-4">
          <button className="border border-gray-200 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700">Extend Due Date</button>
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-orange-100 text-orange-600">Pending</span>
        </div>
        {event.quickAction && (
          <div className="border border-orange-200 bg-orange-50 rounded-lg p-3 mb-5">
            <p className="text-sm text-orange-800 font-medium">{event.quickAction}</p>
          </div>
        )}
        <div className="mt-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Workflow Progress</p>
          <StepRow title="Participants" state={event.steps.participants as any} subtext={`${event.participantCount} Participants Playing`} actionLabel="Manage" href={`/org/tournaments/${tournamentId}/events/${event.id}/participants`} />
          <StepRow title="Fixtures" state={event.steps.fixtures as any} actionLabel="Create" href={`/org/tournaments/${tournamentId}/events/${event.id}/fixtures`} />
          <StepRow title="Matches" state={event.steps.matches as any} actionLabel="Manage" isLast={true} href={`/org/tournaments/${tournamentId}/events/${event.id}/matches`} />
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. SUMMARY TAB COMPONENTS
// ==========================================

const SummaryTab = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-1">
        <h2 className="font-semibold text-lg text-gray-900">1 Event</h2>
        <button className="flex items-center gap-1.5 text-sm font-medium text-orange-500">
          <FilterIcon size={16} /> Filter
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 space-y-4">
          <h3 className="font-semibold text-gray-900">Men's Open | Pickleball</h3>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wide rounded-full border bg-red-100 text-red-700 border-red-200">🔴 Round 2 Live</span>
            <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wide rounded-full border bg-green-100 text-green-700 border-green-200">🟢 ₹3400 Collected</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 bg-gray-50/50 p-3 rounded-lg border border-gray-100">
            <div>3 Matches left in round 1</div>
            <div className="text-right">2 Bye Players</div>
          </div>
          <div className="grid grid-cols-2 mt-3 pt-2">
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Enrolled</p>
              <p className="text-xl font-bold text-gray-900">64</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Confirmed (Paid)</p>
              <p className="text-xl font-bold text-gray-900">64</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-100 bg-gray-50/30">
          <button onClick={() => setIsExpanded(!isExpanded)} className="w-full py-3 flex items-center justify-center gap-1 text-xs font-medium text-gray-500">
            {isExpanded ? "View Less Details" : "View More Details"}
            <ChevronDownIcon size={14} className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
          </button>
          {isExpanded && (
            <div className="px-4 pb-4 space-y-2">
              <div className="flex justify-between items-start py-2 group cursor-pointer">
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full mt-1.5 shrink-0 bg-red-500" />
                  <div>
                    <p className="font-medium text-sm text-gray-900">Fixtures Setup Remaining</p>
                    <p className="text-xs text-gray-500 mt-0.5">Round 2 pending generation</p>
                  </div>
                </div>
                <ChevronRightIcon size={16} className="text-gray-400" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 5. EVENT CREW TAB COMPONENTS
// ==========================================

type CrewMember = {
  id: string;
  name: string;
  role: "admin" | "scorer";
  inviteStatus: "pending" | "accepted" | "rejected" | null;
  initials: string;
};

const CrewTabs = ({ activeRole, setActiveRole }: { activeRole: "admin" | "scorer"; setActiveRole: (role: "admin" | "scorer") => void }) => (
  <div className="flex border-b border-gray-200 mb-4">
    <button
      onClick={() => setActiveRole("admin")}
      className={`flex-1 pb-2 text-center text-sm font-medium transition-colors ${
        activeRole === "admin" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-500 hover:text-gray-700"
      }`}
    >
      Admins
    </button>
    <button
      onClick={() => setActiveRole("scorer")}
      className={`flex-1 pb-2 text-center text-sm font-medium transition-colors ${
        activeRole === "scorer" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-500 hover:text-gray-700"
      }`}
    >
      Scorers
    </button>
  </div>
);

const AddCrewMember = ({ role, onAdd }: { role: "admin" | "scorer"; onAdd: (phone: string) => void }) => {
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim()) {
      onAdd(phone);
      setPhone("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-6">
      <p className="font-medium text-gray-900 text-sm">Add {role === "admin" ? "Admin" : "Scorer"}</p>
      <div className="flex gap-2">
        <input
          type="tel"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="flex-1 rounded-xl bg-white border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-sm"
        />
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-full w-11 h-11 flex items-center justify-center shrink-0 shadow-sm transition-colors active:scale-95"
        >
          <PlusIcon size={20} />
        </button>
      </div>
    </form>
  );
};

const CrewItem = ({ member, onDelete }: { member: CrewMember; onDelete: (id: string) => void }) => {
  const statusConfig = {
    pending: { label: "Invite Sent", styles: "bg-orange-500 text-white" },
    accepted: { label: "Accepted", styles: "bg-green-500 text-white" },
    rejected: { label: "Rejected", styles: "bg-red-500 text-white" },
  };

  return (
    <div className="flex items-center justify-between bg-white rounded-xl p-3 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600 shrink-0">
          {member.initials}
        </div>
        <p className="font-medium text-gray-900 text-sm">{member.name}</p>
      </div>

      <div className="flex items-center gap-3">
        {member.inviteStatus && statusConfig[member.inviteStatus] && (
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wide ${statusConfig[member.inviteStatus].styles}`}>
            {statusConfig[member.inviteStatus].label}
          </span>
        )}
        <button
          onClick={() => onDelete(member.id)}
          className="text-red-400 hover:text-red-600 p-1.5 transition-colors rounded-lg hover:bg-red-50"
        >
          <TrashIcon size={16} />
        </button>
      </div>
    </div>
  );
};

const EventCrewTab = () => {
  const [activeRole, setActiveRole] = useState<"admin" | "scorer">("admin");
  const [crewList, setCrewList] = useState<CrewMember[]>([
    { id: "1", name: "Alex Costa", role: "admin", inviteStatus: "accepted", initials: "AC" },
    { id: "2", name: "Sarah Jenkins", role: "admin", inviteStatus: "pending", initials: "SJ" },
    { id: "3", name: "Mike Ross", role: "scorer", inviteStatus: "rejected", initials: "MR" },
    { id: "4", name: "John Doe", role: "scorer", inviteStatus: null, initials: "JD" },
  ]);

  const displayedCrew = crewList.filter((m) => m.role === activeRole);

  const handleAddMember = (phone: string) => {
    const newMember: CrewMember = {
      id: Date.now().toString(),
      name: phone, // In a real app, this would lookup the user by phone
      role: activeRole,
      inviteStatus: "pending",
      initials: phone.substring(0, 2),
    };
    setCrewList([newMember, ...crewList]);
  };

  const handleDeleteMember = (id: string) => {
    setCrewList(crewList.filter((m) => m.id !== id));
  };

  return (
    <div className="space-y-2">
      <CrewTabs activeRole={activeRole} setActiveRole={setActiveRole} />
      <AddCrewMember role={activeRole} onAdd={handleAddMember} />
      
      <div className="space-y-3">
        {displayedCrew.length > 0 ? (
          displayedCrew.map((member) => (
            <CrewItem key={member.id} member={member} onDelete={handleDeleteMember} />
          ))
        ) : (
          <p className="text-center text-sm text-gray-500 py-6 bg-white rounded-xl border border-gray-100 shadow-sm">
            No {activeRole}s found.
          </p>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 6. MAIN PAGE COMPONENT
// ==========================================

export default function TournamentEventDetailsPage() {
  const params = useParams();
  const tournamentId = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : "";

  const [activeTab, setActiveTab] = useState("Event Crew"); // Defaulting for testing
  const primaryTabs = ["About", "Events", "Summary", "Event Crew"];

  return (
    <div className="min-h-screen bg-[#F6F6F6] px-4 py-3 pb-24 space-y-4">
      <TopAppBar />
      <EventHeader />
      <EventStats />

      <PrimaryTabs
        tabs={primaryTabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="space-y-4">
        {activeTab === "About" && <AboutTab />}
        {activeTab === "Events" && <EventsTab tournamentId={tournamentId} />}
        {activeTab === "Summary" && <SummaryTab />}
        {activeTab === "Event Crew" && <EventCrewTab />}
      </div>
    </div>
  );
}