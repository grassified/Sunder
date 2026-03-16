<script lang="ts">
  import { onMount } from "svelte";
  import Sidebar from "./lib/components/Sidebar.svelte";
  import SearchBar from "./lib/components/SearchBar.svelte";
  import TrackList from "./lib/components/TrackList.svelte";
  import Explore from "./lib/components/Explore.svelte";
  import PlaylistView from "./lib/components/PlaylistView.svelte";
  import QueueView from "./lib/components/QueueView.svelte";
  import Player from "./lib/components/Player.svelte";
  import Toast from "./lib/components/Toast.svelte";
  import { initProgressListener, getPlaybackState, getTrack } from "./lib/ipc/bridge";
  import { nav } from "./lib/state/nav.svelte";
  import { player } from "./lib/state/player.svelte";

  let cleanup: (() => void) | undefined;

  onMount(() => {
    cleanup = initProgressListener();
    
    // Restore player state from backend on page reload
    getPlaybackState().then(async (state) => {
      if (state.current_track_id) {
        const track = await getTrack(state.current_track_id);
        if (track) {
          player.currentTrack = track;
        }
      }
      player.volume = state.volume;
      player.currentTime = state.position_ms / 1000;
      player.duration = state.duration_ms / 1000;
      player.playbackState = state.state;
      player.isPlaying = state.state === "playing";
      player.isBuffering = state.state === "loading" || state.state === "buffering";
    }).catch(console.error);

    return () => cleanup?.();
  });
</script>

<main class="app-shell">
  <Sidebar />

  <div class="main-area">
    <section class="content">
      {#if nav.activeTab === "search"}
        <div class="search-section">
          <SearchBar />
          <TrackList />
        </div>
      {:else if nav.activeTab === "explore"}
        <Explore />
      {:else if nav.activeTab === "queue"}
        <QueueView />
      {:else}
        <PlaylistView />
      {/if}
    </section>

    <Player />
  </div>
  <Toast />
</main>

<style>
  .app-shell {
    display: flex;
    flex-direction: row;
    height: 100vh;
    width: 100vw;
    background: var(--bg-base);
    overflow: hidden;
  }

  .main-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    height: 100vh;
    overflow: hidden;
  }

  .content {
    flex: 1;
    overflow-y: auto;
    padding: 24px 24px 120px;
  }

  .search-section {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
</style>
