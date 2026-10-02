import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { House, Wallet, ShieldCheck, ShoppingCart, UserRound, Shield, Users } from "lucide-react";
import styles from "./PremiumBottomNavigation.module.css";

const baseItems = [
  { title: "خانه",    icon: House,        path: "/" },
  { title: "کیف پول",  icon: Wallet,       path: "/wallet" },
  { title: "سرویس‌ها", icon: ShieldCheck,  path: "/services" },
  { title: "خرید",     icon: ShoppingCart, path: "/subscription" },
  { title: "پروفایل", icon: UserRound,    path: "/profile" },
];

export default function PremiumBottomNavigation() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isReseller, setIsReseller] = useState(false);

  useEffect(() => {
    import("@/shared/store/userStore").then(({ useUserStore }) => {
      const user = useUserStore.getState().user;
      if (user) {
        setIsAdmin(!!(user as any).is_admin);
        setIsReseller(!!(user as any).is_reseller);
      }
    }).catch(() => {});
  }, []);

  const items = [
    ...baseItems,
    ...(isReseller ? [{ title: "نماینده", icon: Users,  path: "/reseller" }] : []),
    ...(isAdmin    ? [{ title: "ادمین",   icon: Shield, path: "/admin"    }] : []),
  ];

  return (
    <nav className={styles.navigation}>
      <div className={styles.liquidBar} />
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink key={item.path} to={item.path} end={item.path === "/"}
            className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ""}`}>
            {({ isActive }) => (
              <>
                <motion.div className={styles.iconWrap} whileTap={{ scale: 0.82 }}>
                  <Icon size={22} />
                  {isActive && <motion.div className={styles.activeGlow} layoutId="nav-glow"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                </motion.div>
                <motion.span className={styles.label} animate={{ opacity: isActive ? 1 : 0.5 }}>
                  {item.title}
                </motion.span>
                <AnimatePresence>
                  {isActive && (
                    <motion.span className={styles.dot}
                      initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }} />
                  )}
                </AnimatePresence>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}
