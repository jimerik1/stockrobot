
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import HeaderLO from "./header";
import MainLandingPageLO from "./mainpageLO";


export default async function MainLandingPage() {


  return (
    <div>

    <HeaderLO />
    <MainLandingPageLO />

    </div>
  );
}