import type { Metadata } from "next";
import { getLanguageAlternates } from "@/app/i18n";
import DocsNavbarComponent from "@/app/components/DocsNavbarComponent";
import DocsSidebarComponent from "@/app/components/DocsSidebarComponent";
import DocTableOfContentComponent from "@/app/components/DocTableOfContentComponent";

export const metadata: Metadata = {
  title: "How to use Databasus with Neon Object Storage | Databasus",
  description:
    "Step-by-step guide to store PostgreSQL backups in Neon Object Storage with Databasus. Create a bucket, get S3 credentials and connect it as S3-compatible storage.",
  keywords: [
    "Databasus",
    "Neon",
    "Neon Object Storage",
    "PostgreSQL backup",
    "S3 storage",
    "cloud storage",
    "database backup",
  ],
  openGraph: {
    title: "How to use Databasus with Neon Object Storage | Databasus",
    description:
      "Step-by-step guide to store PostgreSQL backups in Neon Object Storage with Databasus. Create a bucket, get S3 credentials and connect it as S3-compatible storage.",
    type: "article",
    url: "https://databasus.com/storages/neon",
  },
  twitter: {
    card: "summary",
    title: "How to use Databasus with Neon Object Storage | Databasus",
    description:
      "Step-by-step guide to store PostgreSQL backups in Neon Object Storage with Databasus. Create a bucket, get S3 credentials and connect it as S3-compatible storage.",
  },
  alternates: {
    canonical: "https://databasus.com/storages/neon",
    languages: getLanguageAlternates("storages/neon"),
  },
  robots: "index, follow",
};

export default function NeonStoragePage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to use Databasus with Neon Object Storage",
            description:
              "Step-by-step guide to store PostgreSQL backups in Neon Object Storage with Databasus",
            step: [
              {
                "@type": "HowToStep",
                name: "Create a bucket",
                text: "In the Neon Console, open your project, select a branch, open the Object storage tab and click New bucket. Keep the access level private.",
              },
              {
                "@type": "HowToStep",
                name: "Get the S3 credentials",
                text: "Click Connect, open the Storage tab, choose Parameters only and click Reveal credential. Copy AWS_ENDPOINT_URL_S3, AWS_REGION, AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY.",
              },
              {
                "@type": "HowToStep",
                name: "Fill in the S3 storage form",
                text: "In Databasus, add an S3 storage and enter the bucket name, region, access key, secret key and endpoint from Neon.",
              },
              {
                "@type": "HowToStep",
                name: "Keep path-style addressing",
                text: "Leave Virtual host unchecked and Storage class on its default value.",
              },
              {
                "@type": "HowToStep",
                name: "Test and save",
                text: "Click Test connection, then save the storage.",
              },
            ],
          }),
        }}
      />

      <DocsNavbarComponent />

      <div className="flex min-h-screen bg-[#0F1115]">
        {/* Sidebar */}
        <DocsSidebarComponent />

        {/* Main Content */}
        <main className="flex-1 min-w-0 px-4 py-6 sm:px-6 sm:py-8 lg:px-12">
          <div className="mx-auto max-w-4xl">
            <article className="prose prose-blue max-w-none">
              <h1 id="neon">Neon Object Storage</h1>

              <p className="text-lg text-gray-400">
                Neon Object Storage is S3-compatible storage that belongs to a
                branch of a Neon project. Databasus connects to it through the
                regular S3 storage type, so you only need a bucket, a credential
                and the branch endpoint.
              </p>

              <h2 id="before-you-start">Before you start</h2>

              <p>
                You need a Neon project in a region where <a
                  href="https://neon.com/docs/storage/overview"
                  target="_blank"
                  rel="noopener noreferrer"
                >Object Storage is
                available</a>.
              </p>

              <h2 id="configuration-steps">Configuration steps</h2>

              <h3 id="create-bucket">1. Create a bucket</h3>

              <p>
                In the Neon Console, open your project, select the branch that
                should hold the backups and open the{" "}
                <strong>Object storage</strong> tab. Click{" "}
                <strong>New bucket</strong>, enter a name such as{" "}
                <code>databasus-backups</code>, keep the access level{" "}
                <strong>private</strong> and click <strong>Create</strong>.
              </p>

              <p>With the <a target="_blank" rel="noopener noreferrer" href="https://neon.com/docs/storage/buckets#create-a-bucket">Neon CLI</a>, the same step is one command:</p>

              <pre>
                <code>neon buckets create databasus-backups</code>
              </pre>

              <h3 id="get-credentials">2. Get the S3 credentials</h3>

              <p>
                Click <strong>Connect</strong> and open the <strong>Storage</strong> tab. Choose{" "}
                <strong>.env</strong> tab and you&apos;ll see four values:
              </p>

              <pre>
                <code>{`AWS_ENDPOINT_URL_S3=https://br-cool-darkness-a1b2c3d4.storage.c-1.us-east-2.aws.neon.tech
AWS_REGION=us-east-2
AWS_ACCESS_KEY_ID=nak_live_...
AWS_SECRET_ACCESS_KEY=...`}</code>
              </pre>

              <p>
                To give Databasus its own credential that you can revoke
                separately, create one with the Neon CLI. It needs both storage
                scopes, because Databasus reads backups back and deletes them
                when the retention policy says so:
              </p>

              <pre>
                <code>
                  {
                    "neon credentials create --scope storage:read --scope storage:write --name databasus"
                  }
                </code>
              </pre>

              <p>
                In its output, <code>token_id</code> is the access key and{" "}
                <code>s3_secret_access_key</code> is the secret key. Neon shows
                the secret only once (via CLI), so copy it right away.
              </p>

              <h3 id="fill-storage-form">3. Fill in the S3 storage form</h3>

              <p>
                In Databasus, add a new storage, choose <strong>S3</strong> and
                fill in the fields:
              </p>

              <table>
                <thead>
                  <tr>
                    <th>Databasus field</th>
                    <th>Value from Neon</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>S3 Bucket</td>
                    <td data-label="Value from Neon">
                      The bucket name, e.g. <code>databasus-backups</code>
                    </td>
                  </tr>
                  <tr>
                    <td>Region</td>
                    <td data-label="Value from Neon">
                      <code>AWS_REGION</code>, e.g. <code>us-east-2</code>
                    </td>
                  </tr>
                  <tr>
                    <td>Access key</td>
                    <td data-label="Value from Neon">
                      <code>AWS_ACCESS_KEY_ID</code>
                    </td>
                  </tr>
                  <tr>
                    <td>Secret key</td>
                    <td data-label="Value from Neon">
                      <code>AWS_SECRET_ACCESS_KEY</code>
                    </td>
                  </tr>
                  <tr>
                    <td>Endpoint</td>
                    <td data-label="Value from Neon">
                      <code>AWS_ENDPOINT_URL_S3</code>, including{" "}
                      <code>https://</code>
                    </td>
                  </tr>
                </tbody>
              </table>

              <h3 id="advanced-settings">4. Check the advanced settings</h3>

              <p>
                Neon accepts path-style requests only. Leave{" "}
                <strong>Virtual host</strong> unchecked: with it enabled, the
                connection test fails with a TLS certificate error, because the
                bucket name becomes part of the host name.
              </p>

              <p>
                Leave <strong>Storage class</strong> on its default value. Neon
                has no storage classes and ignores the setting. A{" "}
                <strong>Folder prefix</strong> works as usual if you want to
                keep several Databasus instances in one bucket.
              </p>

              <h3 id="test-connection">5. Test and save</h3>

              <p>
                Click <strong>Test connection</strong>. Databasus writes a small
                test file to the bucket, reads it back and deletes it. When the
                test passes, save the storage.
              </p>

              <p>
                Your Databasus is now ready to use Neon Object Storage as
                storage for your PostgreSQL backups.
              </p>

              <h2 id="branches">Branches and backups</h2>

              <p>
                The endpoint and the credential belong to one branch, and
                Databasus always writes to that branch. The credential also
                works on child branches created from that branch later.
              </p>

              <ul>
                <li>
                  A new child branch gets a copy-on-write snapshot of the bucket
                  at the moment of the fork. Backups written after that appear
                  only on the parent branch.
                </li>
                <li>
                  Deleting the branch or the project deletes its buckets and
                  every backup in them.
                </li>
              </ul>

              {/* Navigation */}
              <div className="mt-12 border-t border-gray-200 pt-8">
                <a
                  href="/storages"
                  className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-800"
                >
                  ← Back to storages
                </a>
              </div>
            </article>
          </div>
        </main>

        {/* Table of Contents */}
        <DocTableOfContentComponent />
      </div>
    </>
  );
}
