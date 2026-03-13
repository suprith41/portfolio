import Image from "next/image"

export default function About() {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <Image
        src="/images/common/sa26-filled.svg"
        alt="SA26"
        width={64}
        height={64}
        className="opacity-20"
      />
    </div>
  )
}
