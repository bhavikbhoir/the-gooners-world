import React from 'react';
import { Composition } from 'remotion';
import MatchReview, { matchReviewSchema } from './MatchReview';

/**
 * Remotion composition registry.
 *
 * Rendered headlessly by the autopilot (Remotion Lambda) once a match finishes;
 * `npm run video:studio` opens the same compositions locally for design work.
 * Duration is driven by the narration length the orchestrator measures, passed
 * in as `durationInFrames` at render time — the default here is a design-time
 * placeholder only.
 */

const FPS = 30;
const FALLBACK_SECONDS = 32;

/**
 * The narration decides the length, not the other way round. The orchestrator
 * measures the Polly MP3 and passes durationMs; a tail is added so the outro
 * is not cut off the instant the voice stops.
 */
const calculateMetadata = ({ props }) => {
  const seconds = props.durationMs ? props.durationMs / 1000 + 1.4 : FALLBACK_SECONDS;
  return { durationInFrames: Math.round(seconds * FPS) };
};

export const RemotionRoot = () => (
  <>
    <Composition
      id="MatchReview"
      component={MatchReview}
      durationInFrames={FPS * FALLBACK_SECONDS}
      fps={FPS}
      width={1080}
      height={1920}
      defaultProps={matchReviewSchema}
      calculateMetadata={calculateMetadata}
    />
  </>
);
