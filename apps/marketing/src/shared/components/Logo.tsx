import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex gap-3 items-center pointer-events-none select-none tracking-tighter z-1">
        <Image
            src="/logo.png"
            alt="Garnet"
            width={40}
            height={40}
        />

        <span className="font-extrabold text-3xl">Garnet</span>
    </div>
  )
}
