import { AnimatePresence } from "framer-motion";
import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

function RoleRedirect() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // اگر کاربر ادمین بود و روی صفحه‌ی اصلی (پنل کاربری) بود => ریدایرکت به پنل ادمین
    if (window.location.pathname !== '/') {
      setChecking(false);
      return;
    }
    fetch('/api/role')
      .then(r => r.json())
      .then(data => {
        if (data.role === 'admin') {
          navigate('/admin-panel', { replace: true });
        }
      })
      .catch(() => {})
      .finally(() => setChecking(false));
  }, [navigate]);

  if (checking && window.location.pathname === '/') {
    return <RouteFallback />;
  }
  return null;
}

function App() {
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/*" element={<RoleRedirect />} />

          <Route
            path="/admin-panel"
            element={<AdminPage />}
          />

          <Route
            path="/reseller"
            element={<ResellerPage />}
          />

          <Route element={<MainLayout />}>

            <Route
              path="/"
              element={<HomePage />}
            />

            <Route
              path="/wallet"
              element={<WalletPage />}
            />

            <Route
              path="/services"
              element={<ServicesPage />}
            />

            <Route
              path="/subscription"
              element={<SubscriptionPage />}
            />

            <Route
              path="/referral"
              element={<ReferralPage />}
            />

            <Route
              path="/support"
              element={<SupportPage />}
            />

            <Route
              path="/profile"
              element={<ProfilePage />}
            />

            <Route
              path="/settings"
              element={<SettingsPage />}
            />

            <Route
              path="/discount"
              element={<DiscountPage />}
            />

            <Route
              path="/free-trial"
              element={<FreeTrialPage />}
            />

            <Route
              path="/custom-build"
              element={<CustomBuildPage />}
            />

          </Route>

        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default App;
