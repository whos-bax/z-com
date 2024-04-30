import {ReactNode} from "react";

export default async function HomeLayout({children}: {children: ReactNode}) {
  return (
    <div>
      {children}
    </div>
  )
}
