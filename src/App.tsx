import WebApp from "@twa-dev/sdk";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";

import MainLayout from "@layouts/MainLayout";
import Skeleton from "@/shared/ui/Skeleton";

import HomePage from "@pages/Home/HomePage";
const WalletPage = lazy(() => import("@pages/Wallet/WalletPage"));
const ServicesPage = lazy(() => import("@pages/Services/ServicesPage"));
const SubscriptionPage = lazy(() => import("@pages/Subscription/SubscriptionPage"));
const ReferralPage = lazy(() => import("@pages/Referral/ReferralPage"));
const SupportPage = lazy(() => import("@pages/Support/SupportPage"));
const ProfilePage = lazy(() => import("@pages/Profile/ProfilePage"));
const SettingsPage = lazy(() => import("@pages/Settings/SettingsPage"));
const DiscountPage = lazy(() => import("@pages/Discount/DiscountPage"));
const FreeTrialPage = lazy(() => import("@pages/FreeTrial/FreeTrialPage"));
const CustomBuildPage = lazy(() => import("@pages/CustomBuild/CustomBuildPage"));
const AdminPage = lazy(() => import("@pages/Admin/AdminPage"));
const ResellerPage = lazy(() => import("@pages/Reseller/ResellerPage"));

function RouteFallback() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, padding: "24px 4px" }}>
      <Skeleton height={120} radius={24} />
      <Skeleton height={60} radius={18} />
      <Skeleton height={60} radius={18} />
    </div>
  );
}

// =====================================================================
// AdminGate: اجرا می‌شود فقط روی صفحه‌ی ریشه (/).
// دو مسیر تشخیص ادمین:
//   ۱. start_param در initData تلگرام (سریع، بدون API call)
//   ۲. فراخوانی /api/me و بررسی is_admin
// اگر ادمین بود → ریدایرکت به /admin-panel
// =====================================================================
function AdminGate() {
  const navigate = useNavigate();
  const [done, setDone] = useState(false);

  useEffect(() => {
    // فقط روی صفحه‌ی اصلی بررسی می‌کنیم
    if (window.location.pathname !== "/") {
      setDone(true);
      return;
    }

    // مسیر اول: start_param تلگرام
    try {
      const sp = (WebApp.initDataUnsafe as any)?.start_param ?? "";
      if (sp === "admin" || sp === "role_admin" || sp === "adminpanel") {
        navigate("/admin-panel", { replace: true });
        setDone(true);
        return;
      }
    } catch {
      // خارج از محیط تلگرام
    }

    // مسیر دوم: /api/me → is_admin
    const BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
    let initData = "";
    try { initData = WebApp.initData || ""; } catch { /* */ }
    const headers: Record<string, string> = initData
      ? { Authorization: `tma ${initData}` }
      : {};

    fetch(`${BASE}/api/me`, { headers })
      .then((r) => r.json())
      .then((data) => {
        if (data?.is_admin) {
          navigate("/admin-panel", { replace: true });
        }
      })
      .catch(() => { /* اگر خطا بود، کاربر همان صفحه‌ی عادی را می‌بیند */ })
      .finally(() => setDone(true));
  }, [navigate]);

  // تا وقتی بررسی ادمین تموم نشده، اسکلتون نشان بده (فقط روی /)
  if (!done && window.location.pathname === "/") {
    return <RouteFallback />;
  }
  return null;
}

function App() {
  return (
    <AnimatePresence mode="wait">
      {/* AdminGate کنار Routes رندر می‌شود، نه داخل Routes */}
      <AdminGate />

      <Suspense fallback={<RouteFallback />}>
        <Routes>
          {/* ===== صفحات ادمین/ریسلر (بدون MainLayout) ===== */}
          <Route
            path="/admin-panel"
            element={<AdminPage />}
          />
          <Route
            path="/reseller"
            element={<ResellerPage />}
          />

          {/* ===== صفحات عادی کاربر (با MainLayout) ===== */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/subscription" element={<SubscriptionPage />} />
            <Route path="/referral" element={<ReferralPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/discount" element={<DiscountPage />} />
            <Route path="/free-trial" element={<FreeTrialPage />} />
            <Route path="/custom-build" element={<CustomBuildPage />} />
          </Route>
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default App;
