import {
  AlarmClock,
  BadgeCheck,
  BookOpenText,
  BriefcaseBusiness,
  CalendarClock,
  Clock3,
  FileText,
  Flag,
  Landmark,
  Mail,
  MapPin,
  MessageSquareText,
  MonitorSmartphone,
  PhoneCall,
  Route,
  Sparkles,
  Stethoscope,
  UsersRound
} from "lucide-react";

const iconRegistry = {
  alarm: AlarmClock,
  badgeCheck: BadgeCheck,
  book: BookOpenText,
  briefcase: BriefcaseBusiness,
  calendar: CalendarClock,
  clock: Clock3,
  fileText: FileText,
  target: Flag,
  landmark: Landmark,
  mail: Mail,
  mapPin: MapPin,
  message: MessageSquareText,
  monitor: MonitorSmartphone,
  phone: PhoneCall,
  route: Route,
  sparkles: Sparkles,
  stethoscope: Stethoscope,
  users: UsersRound
} as const;

export type IconName = keyof typeof iconRegistry;

export function LandingIcon({
  name,
  className = "h-5 w-5"
}: {
  name: IconName;
  className?: string;
}) {
  const Icon = iconRegistry[name];
  return <Icon aria-hidden="true" className={className} strokeWidth={1.85} />;
}
