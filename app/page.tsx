import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { Hero } from "@/components/sections/hero";
import { Card, CardContent } from "@/components/ui/card";
import { Eyebrow, Text, Title } from "@/components/ui/typography";

const CAPABILITIES = ["Testing", "Guardrails", "Workflows"];

export default function Home() {
  return (
    <>
      <Hero />

      <Section>
        <Stack gap="lg" className="w-full">
          <Stack gap="md">
            <Eyebrow>Platform</Eyebrow>
            <Title>Every boundary is one full-bleed rule plus two rails.</Title>
          </Stack>

          <div className="grid w-full gap-4 md:grid-cols-3">
            {CAPABILITIES.map((capability) => (
              <Card key={capability}>
                <CardContent>
                  <Stack gap="xs">
                    <Eyebrow>{capability}</Eyebrow>
                    <Text>
                      Cards keep their own radius; the grid lines stay behind
                      them.
                    </Text>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </div>
        </Stack>
      </Section>

      {/* Tight band: same lines, less air */}
      <Section containerClassName="py-8">
        <Text>
          A tight row works too — rails scale to whatever height the section
          has.
        </Text>
      </Section>

      <Section>
        <Title>Or build anything with a powerful host of APIs</Title>
      </Section>

      <Section rails={false} inset={false}>
        <Text className="py-10">
          Rails off, rule on — for footers and full-width bands.
        </Text>
      </Section>
    </>
  );
}
