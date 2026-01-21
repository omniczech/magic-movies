import Image from "next/image";

import actors from "../src/actors";
import exclusions from "../src/exclusion";
import Film from "@/src/components/Film";
import Homepage from "@/src/components/Homepage";

export const metadata = {
  title: "Magic Movies",
  description:
    "A list of movies with multiple actors who have been on Magic the Gathering cards.",
};

export default function Home() {
  return <Homepage />;
}
