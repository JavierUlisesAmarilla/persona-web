import Home from '@/components/page/home'
import VoiceChat from '@/components/page/voice-chat'
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Page() {
  const session = await getServerSession(authOptions);
  return !session ? await VoiceChat() : await Home()
}
