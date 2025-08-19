"use client";

import { Button } from "@/shared/ui/button";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: VoidFunction;
}) {
  useEffect(() => {
    console.error("Global Error:", error);
  }, [error]);

  return (
    <html>
      <body>
        {/* `NextError` is the default Next.js error page component. Its type
        definition requires a `statusCode` prop. However, since the App Router
        does not expose status codes for errors, we simply pass 0 to render a
        generic error message. */}
        <div className="flex h-screen w-screen flex-col items-center justify-center">
          {/* <AlertTriangle className="text-error-600 h-20 w-20" /> */}
          <h2 className="my-3 text-lg text-black">Maaf, Terjadi kesalahan pada halaman ini.</h2>
          <p className="mb-8 max-w-[80%] text-center">{error.message}</p>
          <Button size="large" color="primary" onClick={reset}>
            Muat Ulang
          </Button>
        </div>
        {/* <NextError statusCode={0} /> */}
      </body>
    </html>
  );
}
