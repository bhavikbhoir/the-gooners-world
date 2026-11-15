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

export const RemotionRoot = () => (
  <>
    <Composition
      id="MatchReview"
      component={MatchReview}
      durationInFrames={FPS * 32}
      fps={FPS}
      width={1080}
      height={1920}
      defaultProps={matchReviewSchema}
    />
  </>
);
