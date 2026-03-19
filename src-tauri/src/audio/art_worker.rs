use tauri::Manager;
use tauri_plugin_notification::NotificationExt;

pub fn trigger_notification(app: &tauri::AppHandle, title: &str, artist: &str) {
    let config = app.state::<crate::config::ConfigManager>().get();
    if !config.notifications_enabled {
        return;
    }

    let _ = app.notification()
        .builder()
        .title(title)
        .body(artist)
        .show();
}
