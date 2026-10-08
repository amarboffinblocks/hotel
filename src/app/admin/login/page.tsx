import { LoginForm } from "@/features/admin/components/login-form";

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center bg-muted/30 px-4 py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, color-mix(in oklch, var(--primary) 35%, transparent), transparent 45%), radial-gradient(circle at 80% 0%, color-mix(in oklch, var(--secondary) 25%, transparent), transparent 40%)",
        }}
      />
      <div className="relative w-full flex justify-center">
        <LoginForm />
      </div>
    </div>
  );
}
