import { Container } from '../container';
import { Dashboard } from '../views/dashboard';

export function refreshDashboard(dashboard: Dashboard) {
	dashboard.refresh();
}

export function refreshDashboardFactory(container: Container) {
	return () => refreshDashboard(
		container.resolve<Dashboard>('Dashboard'));
}
