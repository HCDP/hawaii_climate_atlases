// import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center">
      <p className="w-[48rem] mt-3 text-base">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque feugiat, diam a ullamcorper pulvinar, magna dui posuere augue, vitae tempor ligula nulla quis dolor. Quisque id tortor ut lectus pulvinar tristique eget ut odio. Vivamus condimentum mi diam, sit amet dignissim enim facilisis sagittis. Quisque vel enim ipsum. Curabitur dictum nunc ac suscipit efficitur. Aliquam erat volutpat. Nunc vehicula maximus erat quis tristique. Vestibulum molestie rutrum metus sed tristique. Nunc commodo quis risus eu suscipit. Cras non faucibus quam, non cursus justo. Donec ex sem, consectetur at nisi vitae, dictum posuere lorem. Morbi condimentum, tortor ac euismod mattis, sem erat condimentum magna, quis dapibus quam tellus ac arcu. Ut quis magna dolor. Nulla sodales feugiat volutpat. Nullam vitae finibus sapien.

        Nullam a imperdiet justo. Donec non diam odio. Nulla mi est, egestas sed est at, iaculis faucibus enim. Quisque id neque aliquam, rutrum justo nec, volutpat nisi. Vestibulum pretium dui eu nulla volutpat sagittis. Donec ornare diam eu lacus tempor accumsan. Nullam a magna augue.

        Aenean molestie purus ac turpis vulputate, et eleifend mauris lobortis. Donec malesuada urna nisl, in facilisis libero sodales vel. In orci massa, mollis sollicitudin massa vel, facilisis sagittis quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis placerat vestibulum risus eget suscipit. Ut vel sodales leo, vel rhoncus arcu. Nulla facilisi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

        Donec consequat diam sit amet pulvinar facilisis. Maecenas blandit tincidunt bibendum. Proin ac iaculis dui, vitae sagittis sem. Vivamus rutrum lectus suscipit risus accumsan, vel gravida augue commodo. Curabitur eget orci molestie, auctor eros eu, pulvinar elit. Mauris sodales id arcu at eleifend. Duis pulvinar sit amet mauris in vehicula. Ut ac lobortis risus. Aenean vel nisl accumsan, aliquam mauris ut, pellentesque orci. Vestibulum porta consectetur tellus vitae commodo.

        Maecenas tellus velit, venenatis et fermentum in, fringilla eget ipsum. Quisque purus nunc, imperdiet in felis in, sodales pulvinar erat. Proin eget ipsum a lorem porta convallis vitae nec dolor. Vivamus ullamcorper eu nunc vel vulputate. Donec vulputate urna arcu, eget sollicitudin enim varius a. Aenean rutrum, lorem sed pellentesque tincidunt, purus est aliquet urna, quis facilisis libero ligula vel ante. Proin semper ultrices augue. Phasellus at fringilla quam, vitae sodales libero. Vestibulum ut neque nulla. Sed auctor sollicitudin diam sit amet facilisis. Pellentesque euismod luctus ex non hendrerit.
      </p>
    </div>
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    //   <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
    //     <Image
    //       className="dark:invert"
    //       src="https://nextjs.org/icons/next.svg"
    //       alt="Next.js logo"
    //       width={180}
    //       height={38}
    //       priority
    //     />
    //     <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
    //       <li className="mb-2">
    //         Get started by editing{" "}
    //         <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
    //           src/app/page.tsx
    //         </code>
    //         .
    //       </li>
    //       <li>Save and see your changes instantly.</li>
    //     </ol>
    //
    //     <div className="flex gap-4 items-center flex-col sm:flex-row">
    //       <a
    //         className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
    //         href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         <Image
    //           className="dark:invert"
    //           src="https://nextjs.org/icons/vercel.svg"
    //           alt="Vercel logomark"
    //           width={20}
    //           height={20}
    //         />
    //         Deploy now
    //       </a>
    //       <a
    //         className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
    //         href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Read our docs
    //       </a>
    //     </div>
    //   </main>
    //   <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="https://nextjs.org/icons/file.svg"
    //         alt="File icon"
    //         width={16}
    //         height={16}
    //       />
    //       Learn
    //     </a>
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="https://nextjs.org/icons/window.svg"
    //         alt="Window icon"
    //         width={16}
    //         height={16}
    //       />
    //       Examples
    //     </a>
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="https://nextjs.org/icons/globe.svg"
    //         alt="Globe icon"
    //         width={16}
    //         height={16}
    //       />
    //       Go to nextjs.org →
    //     </a>
    //   </footer>
    // </div>
  );
}
