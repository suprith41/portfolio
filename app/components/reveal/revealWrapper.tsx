"use client"

import dynamic from "next/dynamic"

const Reveal = dynamic(() => import("./reveal"), {
  ssr: false
})

export default Reveal
