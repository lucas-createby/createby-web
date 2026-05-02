import { auth } from "@/auth"
import MinHageApp from "./_components/MinHageApp"

export default async function MinHagePage() {
  const session = await auth()
  return <MinHageApp userEmail={session?.user?.email ?? ""} userName={session?.user?.name ?? ""} />
}
