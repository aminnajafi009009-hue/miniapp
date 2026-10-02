import { AnimatePresence } from "framer-motion";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import MainLayout from "@layouts/MainLayout";
import Skeleton from "@/shared/ui/Skeleton";

// HomePage صفحه‌ی اول ورودی مینی‌اپه، پس همیشه eager لود می‌شه (بدون تأخیر
// اضافه‌ی chunk جدا). بقیه‌ی صفحات فقط وقتی کاربر واقعاً بهشون navigate کنه
// دانلود می‌شن (کد-اسپلیتینگ) تا حجم اولیه‌ی باندل و زمان لود اول کمتر بشه —
// این برای کاربرهایی که با فیلترشکن وصل می‌شن محسوس‌تره.
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

function App() {
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<RouteFallback />}>
        <Routes>

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
