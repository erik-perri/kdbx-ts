type TransformMethod<TransformParams> = (
  key: Uint8Array,
  parameters: TransformParams,
) => Promise<unknown>;

type BenchmarkOptions<Params> = {
  key: Uint8Array;
  parameterToBenchmark: keyof Params;
  parameters: Params;
  targetMilliseconds: number;
  trials: number;
};

export default async function benchmarkKdfKey<TransformerParams>(
  transformer: TransformMethod<TransformerParams>,
  options: BenchmarkOptions<TransformerParams>,
): Promise<number> {
  let totalDuration = 0;

  for (let i = 0; i < options.trials; ++i) {
    const trialStartTime = Date.now();
    await transformer(options.key, options.parameters);
    totalDuration += Date.now() - trialStartTime;
  }

  const averageDuration = totalDuration / options.trials;
  const currentValue = Number(options.parameters[options.parameterToBenchmark]);

  return Math.floor(
    (currentValue * options.targetMilliseconds) / averageDuration,
  );
}
