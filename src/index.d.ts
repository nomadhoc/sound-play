import { ChildProcess } from 'child_process';

export interface PlayerInstance {
  /** Stops playback by killing the child process */
  stop(): void;

  /** Promise that resolves when playback finishes */
  play(): Promise<void>;

  /** The spawned child process running the playback command */
  process: ChildProcess;
}

/**
 * Creates a new audio player instance for the given file path.
 * @param path Path to the audio file
 * @param volume Playback volume (0.0 to 1.0, default 0.5)
 * @param rate Playback rate (default 1.0)
 */
export function player(
  path: string,
  volume?: number,
  rate?: number
): PlayerInstance; 
