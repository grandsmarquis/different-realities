import{a as e,n as t,t as n}from"./jsx-runtime-Bg_NI1en.js";import{t as r}from"./emails-Beq0rg3h.js";import{n as i,r as a,t as o}from"./stocks-DU-kV3e4.js";var s=e(t(),1),c=n(),l=[{id:`home`,filename:`START_HERE.txt`},{id:`inbox`,filename:`INBOX.TXT`},{id:`weather`,filename:`WEATHER.LOG`},{id:`news`,filename:`HEADLINES.TXT`},{id:`stocks`,filename:`STONKS.CSV`}];function u(e){let t=Math.round(e/100*14);return`${`█`.repeat(t)}${`░`.repeat(Math.max(0,14-t))}`}function d(e){if(!e?.length)return`—`;let t=Math.min(...e),n=Math.max(...e)-t||1;return e.slice(-24).map(e=>{let r=(e-t)/n;return` ▁▂▃▄▅▆▇█`[Math.min(8,Math.max(1,Math.round(r*8)))]}).join(``)}function f({className:e}){return(0,c.jsxs)(`svg`,{className:e,viewBox:`0 0 32 32`,width:`16`,height:`16`,"aria-hidden":!0,children:[(0,c.jsx)(`rect`,{x:`6`,y:`4`,width:`20`,height:`24`,rx:`1`,fill:`#f3f3f3`,stroke:`#555`,strokeWidth:`1`}),(0,c.jsx)(`line`,{x1:`9`,y1:`9`,x2:`23`,y2:`9`,stroke:`#888`,strokeWidth:`1`}),(0,c.jsx)(`line`,{x1:`9`,y1:`12`,x2:`21`,y2:`12`,stroke:`#bbb`,strokeWidth:`1`}),(0,c.jsx)(`line`,{x1:`9`,y1:`15`,x2:`23`,y2:`15`,stroke:`#bbb`,strokeWidth:`1`}),(0,c.jsx)(`line`,{x1:`9`,y1:`18`,x2:`19`,y2:`18`,stroke:`#bbb`,strokeWidth:`1`})]})}function p({onSwitchPersona:e}){let[t,n]=(0,s.useState)(`home`),[p,m]=(0,s.useState)(null),[h,g]=(0,s.useState)(null),_=(0,s.useMemo)(()=>{let e=`100% | Windows (CRLF) | UTF-8`;return p?`${e} | READ-ONLY`:`${e} | Ln 1, Col ${l.findIndex(e=>e.id===t)+3}`},[t,p]),v=(0,s.useMemo)(()=>{if(t===`home`)return[``,`  NOTEPAD WEB BROWSER  [experimental build 0x7F]`,`  =============================================`,``,`  You found the secret trick: the whole internet`,`  is just text files if you believe hard enough.`,``,`  Open a "site" (tab above) or pick a number:`,``,`    [1] INBOX.TXT      — electronic mail as God intended`,`    [2] WEATHER.LOG    — sky conditions, no cookies`,`    [3] HEADLINES.TXT  — news without autoplay`,`    [4] STONKS.CSV     — numbers go up (sometimes)`,``,`  Tip: File > Exit opens the real world again.`,``,`        .--.`,`       |o_o |   <-- you`,`       |:_/ |`,`      //   \\ \\`,`     (|     | )`,"    /'\\_   _/`\\",`    \\___)=(___/`,``,`  Status: CONNECTED (via imaginary TCP over TXT)`,``].join(`
`);if(t===`inbox`)return[``,`  INBOX — saved from Outlook Express (not really)`,`  `+`─`.repeat(52),``,`  Click a line in the list below (yes, this is still the web)`,``].join(`
`);if(t===`weather`){let e=u(a.humidity),t=u(Math.min(100,a.wind*4));return[``,`  WEATHER.LOG   // local cache, totally legit`,`  `+`═`.repeat(40),``,`        .-.`,`       (   ).   ${a.city}, ${a.country}`,`        '-´     ${a.icon}  ${a.temp}°C  feels like ${a.feels_like}°C`,``,`  Condition : ${a.condition}`,`  Humidity  : ${e} ${a.humidity}%`,`  Wind vibe : ${t} ${a.wind} km/h`,``,`  5-DAY "FORECAST" (from clipboard)`,`  `+`-`.repeat(44),...a.forecast.map(e=>`    ${e.day.padEnd(5)}  ${e.icon}  high ${String(e.high).padStart(2)}°  low ${String(e.low).padStart(2)}°`),``,`  [animating clouds outside your window...]`,``].join(`
`)}if(t===`news`){let e=[``,`  HEADLINES.TXT — scraped with Ctrl+C / Ctrl+V technology`,`  `+`·`.repeat(50),``];return i.forEach((t,n)=>{e.push(`  :: ${String(n+1).padStart(2)} :: ${t.emoji} ${t.title}`),e.push(`           (${t.source} · ${t.time})`),e.push(``)}),e.join(`
`)}if(t===`stocks`){let e=[``,`  STONKS.CSV   (comma-free edition)`,`  `+`─`.repeat(56),``,`  TICKER   PRICE        Δ%     MICRO "CHART"`,`  `+`-`.repeat(56)];return o.forEach(t=>{let n=t.changePct>=0?`+`:``;e.push(`  ${t.ticker.padEnd(6)} ${(t.currency+t.price.toFixed(2)).padStart(12)}  ${n}${t.changePct}%   ${d(t.series)}`)}),e.push(`  `+`-`.repeat(56)),e.push(``),e.push(`  Disclaimer: past performance is a series of Unicode blocks.`),e.push(``),e.join(`
`)}return``},[t]);return(0,c.jsxs)(`div`,{className:`notepad-browser-root relative min-h-dvh overflow-x-hidden pb-8 text-[#0d1b2a]`,children:[(0,c.jsx)(`style`,{children:`
        @keyframes notepad-caret-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes notepad-float-txt {
          0%, 100% { transform: translateY(0) rotate(-6deg); }
          50% { transform: translateY(-10px) rotate(4deg); }
        }
        @keyframes notepad-spider {
          0% { left: 4%; top: 18%; }
          25% { left: 78%; top: 22%; }
          50% { left: 62%; top: 8%; }
          75% { left: 20%; top: 12%; }
          100% { left: 4%; top: 18%; }
        }
        @keyframes notepad-cloud-drift {
          0% { transform: translateX(0); opacity: 0.35; }
          50% { transform: translateX(12px); opacity: 0.55; }
          100% { transform: translateX(0); opacity: 0.35; }
        }
        @keyframes notepad-window-in {
          from { opacity: 0; transform: scale(0.96) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .notepad-caret {
          display: inline-block;
          width: 2px;
          height: 1.1em;
          margin-left: 1px;
          background: #000;
          vertical-align: text-bottom;
          animation: notepad-caret-blink 1.05s step-end infinite;
        }
        .notepad-float-icon {
          animation: notepad-float-txt 4.5s ease-in-out infinite;
        }
        .notepad-cloud-puff {
          animation: notepad-cloud-drift 5s ease-in-out infinite;
        }
        .notepad-cloud-puff-delay {
          animation: notepad-cloud-drift 6.5s ease-in-out infinite;
          animation-delay: 0.8s;
        }
        .notepad-main-window {
          animation: notepad-window-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .notepad-spider {
          position: absolute;
          animation: notepad-spider 28s ease-in-out infinite;
        }
        .notepad-email-pop {
          animation: notepad-window-in 0.35s ease-out both;
        }
        @media (prefers-reduced-motion: reduce) {
          .notepad-caret,
          .notepad-float-icon,
          .notepad-cloud-puff,
          .notepad-cloud-puff-delay,
          .notepad-main-window,
          .notepad-email-pop,
          .notepad-spider {
            animation: none !important;
          }
          .notepad-main-window,
          .notepad-email-pop {
            opacity: 1;
            transform: none;
          }
        }
      `}),(0,c.jsx)(`div`,{className:`pointer-events-none absolute inset-0 motion-safe:opacity-100`,style:{background:`
            radial-gradient(ellipse 120% 80% at 50% -20%, rgba(255,255,255,0.14), transparent 50%),
            linear-gradient(165deg, #3d5a80 0%, #293241 45%, #1b263b 100%)
          `}}),(0,c.jsx)(`div`,{className:`pointer-events-none absolute inset-0 opacity-[0.07] motion-safe:opacity-[0.07]`,style:{backgroundImage:`linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,backgroundSize:`24px 24px`}}),(0,c.jsx)(`span`,{className:`notepad-spider pointer-events-none select-none text-lg motion-reduce:hidden`,"aria-hidden":!0,children:`🕷️`}),(0,c.jsx)(`div`,{className:`notepad-float-icon pointer-events-none absolute right-[8%] top-[12%] text-4xl opacity-50 motion-reduce:opacity-40`,children:`📄`}),(0,c.jsx)(`div`,{className:`notepad-cloud-puff pointer-events-none absolute left-[6%] top-[24%] text-3xl motion-reduce:opacity-30`,children:`☁️`}),(0,c.jsx)(`div`,{className:`notepad-cloud-puff-delay pointer-events-none absolute right-[18%] top-[8%] text-2xl motion-reduce:opacity-25`,children:`☁️`}),(0,c.jsxs)(`div`,{className:`relative z-[1] mx-auto flex min-h-dvh max-w-5xl flex-col px-3 py-6 sm:px-5`,children:[(0,c.jsxs)(`p`,{className:`m-0 mb-3 text-center text-xs font-medium text-white/70`,children:[`C:\\Program Files\\Internet Explorer\\\xA0`,(0,c.jsx)(`span`,{className:`font-mono text-[#ee6c4d]`,children:`iexplore.exe`}),(0,c.jsx)(`span`,{className:`text-white/50`,children:` → renamed to `}),(0,c.jsx)(`span`,{className:`font-mono text-[#90e0ef]`,children:`notepad.exe`})]}),(0,c.jsxs)(`div`,{className:`notepad-main-window flex min-h-0 flex-1 flex-col overflow-hidden rounded-t-md border border-[#1a1a1a] bg-[#ececec] shadow-[0_18px_50px_rgba(0,0,0,0.45)]`,role:`application`,"aria-label":`Notepad web browser`,children:[(0,c.jsxs)(`div`,{className:`flex shrink-0 items-center gap-2 rounded-t-md bg-[#0078d4] px-2 py-1.5 text-white`,children:[(0,c.jsx)(f,{className:`shrink-0`}),(0,c.jsxs)(`span`,{className:`min-w-0 flex-1 truncate text-center text-xs font-normal sm:text-sm`,children:[p?`MSG_${p.id}.TXT - Notepad`:l.find(e=>e.id===t)?.filename,` - Notepad`]}),(0,c.jsxs)(`div`,{className:`flex shrink-0 gap-1`,children:[(0,c.jsx)(`span`,{className:`flex h-6 w-8 items-center justify-center rounded hover:bg-white/15`,"aria-hidden":!0,children:`─`}),(0,c.jsx)(`span`,{className:`flex h-6 w-8 items-center justify-center rounded hover:bg-white/15`,"aria-hidden":!0,children:`□`}),(0,c.jsx)(`span`,{className:`flex h-6 w-8 items-center justify-center rounded hover:bg-[#e81123]`,"aria-hidden":!0,children:`✕`})]})]}),(0,c.jsx)(`div`,{className:`relative flex shrink-0 flex-wrap gap-x-1 border-b border-[#ccc] bg-[#f0f0f0] px-1 py-0.5 text-xs text-[#222]`,onMouseLeave:()=>g(null),children:[`File`,`Edit`,`Format`,`View`,`Help`].map(t=>(0,c.jsxs)(`div`,{className:`relative`,children:[(0,c.jsx)(`button`,{type:`button`,className:`rounded px-2 py-0.5 hover:bg-[#d8e6f8] ${h===t?`bg-[#cce4ff]`:``}`,onMouseEnter:()=>g(t),onFocus:()=>g(t),children:t}),h===t&&(0,c.jsxs)(`div`,{className:`absolute left-0 top-full z-20 min-w-[11rem] border border-[#888] bg-[#f0f0f0] py-0.5 shadow-md`,children:[t===`File`&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(`button`,{type:`button`,className:`block w-full px-3 py-1.5 text-left hover:bg-[#0078d4] hover:text-white`,onClick:()=>{m(null),n(`home`),g(null)},children:`New window`}),(0,c.jsx)(`button`,{type:`button`,className:`block w-full px-3 py-1.5 text-left hover:bg-[#0078d4] hover:text-white`,onClick:()=>{e?.(),g(null)},children:`Exit`})]}),t===`Help`&&(0,c.jsx)(`p`,{className:`m-0 max-w-[14rem] px-3 py-2 text-[10px] leading-snug text-[#333]`,children:`This is not a bug. Browsing in Notepad is a lifestyle. Press Alt+F4 for emotional damage.`}),t!==`File`&&t!==`Help`&&(0,c.jsx)(`p`,{className:`m-0 px-3 py-2 text-[10px] text-[#666]`,children:`(not implemented — it never is)`})]})]},t))}),(0,c.jsxs)(`div`,{className:`flex shrink-0 items-center gap-2 border-b border-[#d0d0d0] bg-white px-2 py-1`,children:[(0,c.jsx)(`span`,{className:`text-[10px] text-[#666]`,children:`Address`}),(0,c.jsxs)(`div`,{className:`min-w-0 flex-1 truncate rounded border border-[#7a7a7a] bg-white px-2 py-0.5 font-mono text-[10px] text-[#111]`,children:[`file:///C:/Users/DefinitelyNotHacking/Downloads/`,l.find(e=>e.id===t)?.filename??`START_HERE.txt`]}),(0,c.jsx)(`span`,{className:`motion-safe:animate-pulse text-[10px] font-mono text-[#0078d4]`,children:`● REC`})]}),(0,c.jsx)(`div`,{className:`flex shrink-0 gap-0.5 overflow-x-auto border-b border-[#c8c8c8] bg-[#e8e8e8] px-1 pt-1`,children:l.map(e=>(0,c.jsx)(`button`,{type:`button`,onClick:()=>{n(e.id),m(null)},className:`whitespace-nowrap rounded-t border border-b-0 px-2 py-1 font-mono text-[10px] sm:text-xs ${t===e.id&&!p?`border-[#b0b0b0] bg-white text-[#000] -mb-px pb-1.5`:`border-transparent bg-[#d8d8d8] text-[#444] hover:bg-[#e2e2e2]`}`,children:e.filename},e.id))}),(0,c.jsx)(`div`,{className:`relative flex min-h-[min(60vh,420px)] flex-1 flex-col bg-white`,children:(0,c.jsxs)(`div`,{className:`notepad-editor-scroll min-h-0 flex-1 overflow-auto`,children:[(0,c.jsxs)(`pre`,{className:`m-0 whitespace-pre-wrap break-words p-3 pb-0 font-mono text-[11px] leading-relaxed text-black sm:text-xs sm:leading-relaxed`,children:[v,(0,c.jsx)(`span`,{className:`notepad-caret motion-reduce:bg-transparent motion-reduce:animate-none`,"aria-hidden":!0})]}),t===`inbox`&&!p&&(0,c.jsx)(`ul`,{className:`m-0 list-none space-y-0.5 px-3 pb-4 pt-0`,children:r.map((e,t)=>{let n=e.read?` `:`*`;return(0,c.jsx)(`li`,{children:(0,c.jsxs)(`button`,{type:`button`,onClick:()=>m(e),className:`btn btn-ghost btn-sm h-auto min-h-0 w-full justify-start rounded-sm border border-transparent px-2 py-1.5 font-mono text-[11px] normal-case text-black hover:border-[#0078d4]/50 hover:bg-[#e5f1fb] sm:text-xs`,children:[(0,c.jsxs)(`span`,{className:`text-[#0b57d0]`,children:[String(t+1).padStart(2),`. [`,n,`] `,e.time.padEnd(7),` `,e.from.avatar,` `,e.from.name]}),(0,c.jsx)(`br`,{}),(0,c.jsxs)(`span`,{className:`text-[#333]`,children:[`SUBJ: `,e.subject]}),(0,c.jsx)(`br`,{}),(0,c.jsxs)(`span`,{className:`text-[#555]`,children:[`PREV: `,e.preview.slice(0,72),e.preview.length>72?`…`:``]})]})},e.id)})}),t===`home`&&(0,c.jsx)(`div`,{className:`flex flex-wrap gap-2 px-3 pb-6 pt-4`,children:l.filter(e=>e.id!==`home`).map(e=>(0,c.jsxs)(`button`,{type:`button`,onClick:()=>n(e.id),className:`btn btn-primary btn-xs font-mono normal-case`,children:[`Open `,e.filename]},e.id))})]})}),(0,c.jsxs)(`div`,{className:`flex shrink-0 items-center justify-between gap-2 border-t border-[#f0f0f0] bg-[#0078d4] px-2 py-0.5 text-[10px] text-white`,children:[(0,c.jsx)(`span`,{className:`min-w-0 truncate font-mono`,children:_}),(0,c.jsx)(`span`,{className:`shrink-0 font-mono motion-safe:animate-pulse`,children:`Downloading`})]})]}),p&&(0,c.jsxs)(`div`,{className:`fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center`,role:`dialog`,"aria-modal":`true`,"aria-labelledby":`notepad-email-title`,children:[(0,c.jsx)(`button`,{type:`button`,className:`absolute inset-0 bg-black/40 backdrop-blur-[1px]`,"aria-label":`Close message`,onClick:()=>m(null)}),(0,c.jsxs)(`div`,{className:`notepad-email-pop relative z-[1] w-full max-w-lg overflow-hidden rounded-t-md border border-[#1a1a1a] bg-[#ececec] shadow-[0_24px_60px_rgba(0,0,0,0.5)] sm:rounded-md`,children:[(0,c.jsxs)(`div`,{className:`flex items-center gap-2 bg-[#0078d4] px-2 py-1 text-white`,children:[(0,c.jsx)(f,{className:`shrink-0`}),(0,c.jsxs)(`span`,{id:`notepad-email-title`,className:`flex-1 truncate text-xs`,children:[`MSG_`,p.id,`.TXT`]}),(0,c.jsx)(`button`,{type:`button`,className:`btn btn-ghost btn-xs min-h-0 h-7 rounded px-2 text-white hover:bg-[#e81123]`,onClick:()=>m(null),children:`✕`})]}),(0,c.jsxs)(`div`,{className:`max-h-[min(55vh,420px)] overflow-auto bg-white p-3 font-mono text-[11px] leading-relaxed text-black sm:text-xs`,children:[(0,c.jsxs)(`p`,{className:`mt-0 border-b border-[#ddd] pb-2 text-[10px] text-[#444]`,children:[`From: `,p.from.name,` <`,p.from.email,`>`,(0,c.jsx)(`br`,{}),`Date: `,p.date,` `,p.time,(0,c.jsx)(`br`,{}),`Subject: `,p.subject]}),(0,c.jsx)(`pre`,{className:`m-0 mt-2 whitespace-pre-wrap font-mono`,children:p.body}),(0,c.jsx)(`span`,{className:`notepad-caret motion-reduce:hidden`,"aria-hidden":!0})]}),(0,c.jsxs)(`div`,{className:`flex justify-end gap-2 border-t border-[#ddd] bg-[#f0f0f0] p-2`,children:[(0,c.jsx)(`button`,{type:`button`,className:`btn btn-sm`,onClick:()=>m(null),children:`Close`}),(0,c.jsx)(`button`,{type:`button`,className:`btn btn-primary btn-sm`,onClick:()=>m(null),children:`OK`})]})]})]})]})]})}var m={id:`notepadBrowser`,label:`Browsing in Notepad.exe`,emoji:`📝`,description:`The whole internet is just .txt files if you try hard enough. Tabs, ASCII art, and a spider on your desktop.`,fonts:[],cssVars:{"--bg":`#1b263b`,"--bg2":`#293241`,"--text":`#e0e1dd`,"--text2":`#778da9`,"--accent":`#0078d4`,"--accent2":`#90e0ef`,"--border":`#415a77`,"--card":`#ececec`,"--font-main":`'Segoe UI', 'Tahoma', system-ui, sans-serif`,"--font-display":`'Segoe UI', 'Tahoma', system-ui, sans-serif`},emailSelectionInModal:!0,Layout:p};export{m as default};