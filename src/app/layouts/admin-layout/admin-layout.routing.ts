import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { ResturentComponent } from "src/app/resturent/resturent.component";
import { FeedbackComponent } from "src/app/feedback/feedback.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "user-profile", component: UserProfileComponent },
  { path: "tables", component: TablesComponent },
  { path: "icons", component: IconsComponent },
  { path: "icons/:id", component: IconsComponent },
  { path: "Resturent/:id", component: ResturentComponent },
  { path: "Resturent", component: ResturentComponent },
  { path: "Feedback", component: FeedbackComponent },
];
