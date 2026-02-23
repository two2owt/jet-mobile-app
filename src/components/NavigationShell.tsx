import { BottomNav } from "./BottomNav";
import { useBottomNavigation } from "@/hooks/useBottomNavigation";

/**
 * Persistent navigation shell rendered as Suspense fallback.
 * Header is now rendered globally in App.tsx via HeaderContext,
 * so this shell only provides the BottomNav and content placeholder.
 */
export function NavigationShell() {
  const { activeTab, handleTabChange } = useBottomNavigation({ defaultTab: "map" });

  return (
    <div
      className="relative w-full h-full"
      style={{
        flex: '1 1 0%',
        minHeight: 0,
        overflow: 'hidden',
      }}
    >
      <main
        role="main"
        style={{
          flex: '1 1 auto',
          height: 'var(--main-height, calc(100dvh - 52px - 60px))',
          minHeight: 'var(--main-height, calc(100dvh - 52px - 60px))',
          maxHeight: 'var(--main-height, calc(100dvh - 52px - 60px))',
          contain: 'strict',
          transform: 'translateZ(0)',
          boxSizing: 'border-box',
          width: '100%',
        }}
      />

      <BottomNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        notificationCount={0}
      />
    </div>
  );
}
