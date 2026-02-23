import { Map, Compass, Bell, Star, Users } from "lucide-react";
import { useCallback } from "react";

type NavItem = "map" | "explore" | "notifications" | "favorites" | "social";

interface BottomNavProps {
  activeTab: NavItem;
  onTabChange: (tab: NavItem) => void;
  notificationCount?: number;
  onPrefetch?: (tab: NavItem) => void;
}

export const BottomNav = ({ activeTab, onTabChange, notificationCount = 0, onPrefetch }: BottomNavProps) => {
  const handlePrefetch = useCallback((tab: NavItem) => {
    if (onPrefetch && tab !== activeTab) {
      onPrefetch(tab);
    }
  }, [onPrefetch, activeTab]);

  const navItems = [
    { id: "map" as NavItem, icon: Map, label: "Map" },
    { id: "explore" as NavItem, icon: Compass, label: "Explore" },
    { id: "notifications" as NavItem, icon: Bell, label: "Alerts" },
    { id: "favorites" as NavItem, icon: Star, label: "Saved" },
    { id: "social" as NavItem, icon: Users, label: "Friends" },
  ];

  return (
    <nav 
      className="fixed left-0 right-0 bottom-0 z-50 text-foreground"
      role="navigation"
      aria-label="Main navigation"
      style={{
        paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 4px)',
        paddingLeft: 'var(--safe-area-inset-left)',
        paddingRight: 'var(--safe-area-inset-right)',
        height: 'var(--bottom-nav-total-height)',
        minHeight: 'var(--bottom-nav-total-height)',
        maxHeight: 'var(--bottom-nav-total-height)',
        flexShrink: 0,
      }}
    >
      {/* Glassmorphic background */}
      <div 
        className="absolute inset-0 bg-card/80 backdrop-blur-2xl saturate-150"
        style={{ zIndex: -1 }}
      />
      
      {/* Brand gradient overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-accent/5"
        style={{ zIndex: -1 }}
      />
      
      {/* Top border with brand gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-primary/30 via-accent/40 to-primary/30" />
      
      {/* Soft shadow above */}
      <div 
        className="absolute -top-4 left-0 right-0 h-4 bg-gradient-to-t from-black/8 to-transparent pointer-events-none"
        style={{ zIndex: -1 }}
      />

      <div className="max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 h-full flex items-center" style={{ display: 'flex', alignItems: 'center', height: '100%', paddingLeft: '1rem', paddingRight: '1rem', maxWidth: '32rem', marginLeft: 'auto', marginRight: 'auto' }}>
        <div className="flex items-center justify-around w-full gap-fluid-xs" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            const hasNotification = item.id === 'notifications' && notificationCount > 0;
              
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                onMouseEnter={() => handlePrefetch(item.id)}
                onTouchStart={() => handlePrefetch(item.id)}
                aria-label={`${item.label}${hasNotification ? `, ${notificationCount} unread` : ''}`}
                aria-current={isActive ? "page" : undefined}
                className={`
                  relative flex flex-col items-center justify-center gap-0.5 
                  px-3 sm:px-4 py-2 rounded-xl
                  transition-all duration-200 ease-out
                  touch-manipulation
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card
                  ${isActive 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                  }
                `}
                style={{
                  minWidth: 'clamp(52px, 14vw, 68px)',
                  minHeight: 'clamp(44px, 10vw, 52px)',
                }}
              >
                {/* Active indicator pill */}
                {isActive && (
                  <div 
                    className="absolute inset-x-1.5 -top-0.5 h-[3px] rounded-full bg-gradient-to-r from-primary via-accent to-primary"
                    style={{
                      boxShadow: '0 0 12px hsl(var(--primary) / 0.6), 0 0 4px hsl(var(--accent) / 0.4)',
                    }}
                  />
                )}
                
                {/* Hover/active background */}
                <div 
                  className={`
                    absolute inset-1 rounded-lg transition-all duration-200
                    ${isActive 
                      ? "bg-gradient-to-b from-primary/15 to-accent/10" 
                      : "bg-transparent hover:bg-primary/5"
                    }
                  `}
                />
                
                {/* Notification badge */}
                {hasNotification && (
                  <span 
                    className="absolute top-1 right-1 sm:right-2 flex items-center justify-center min-w-[16px] h-4 px-1 text-[9px] font-bold bg-destructive text-destructive-foreground rounded-full shadow-sm"
                    aria-hidden="true"
                  >
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                )}
                
                {/* Icon with enhanced styling */}
                <div className="relative z-10">
                  <Icon 
                    className={`
                      w-5 h-5 sm:w-6 sm:h-6 
                      transition-transform duration-200
                      ${isActive ? "scale-105" : "scale-100"}
                    `}
                    strokeWidth={isActive ? 2.5 : 2}
                    aria-hidden="true"
                  />
                </div>
                
                {/* Label with enhanced typography */}
                <span 
                  className={`
                    relative z-10 text-[10px] sm:text-xs font-medium whitespace-nowrap
                    transition-all duration-200
                    ${isActive 
                      ? "opacity-100 font-semibold" 
                      : "opacity-60"
                    }
                  `}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
