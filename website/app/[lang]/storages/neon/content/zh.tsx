import type { Metadata } from "next";
import { OG_LOCALES, getLanguageAlternates, getLocalizedUrl } from "@/app/i18n";
import DocsNavbarComponent from "@/app/components/DocsNavbarComponent";
import DocsSidebarComponent from "@/app/components/DocsSidebarComponent";
import DocTableOfContentComponent from "@/app/components/DocTableOfContentComponent";

export const metadata: Metadata = {
  title: "如何在 Databasus 中使用 Neon Object Storage | Databasus",
  description:
    "分步指南：用 Databasus 把 PostgreSQL 备份存到 Neon Object Storage。创建存储桶，获取 S3 凭据，再把它作为 S3 兼容存储接入。",
  keywords: [
    "Databasus",
    "Neon",
    "Neon Object Storage",
    "PostgreSQL 备份",
    "S3 存储",
    "云存储",
    "数据库备份",
  ],
  openGraph: {
    title: "如何在 Databasus 中使用 Neon Object Storage | Databasus",
    description:
      "分步指南：用 Databasus 把 PostgreSQL 备份存到 Neon Object Storage。创建存储桶，获取 S3 凭据，再把它作为 S3 兼容存储接入。",
    type: "article",
    url: getLocalizedUrl("zh", "storages/neon"),
    locale: OG_LOCALES.zh,
  },
  twitter: {
    card: "summary",
    title: "如何在 Databasus 中使用 Neon Object Storage | Databasus",
    description:
      "分步指南：用 Databasus 把 PostgreSQL 备份存到 Neon Object Storage。创建存储桶，获取 S3 凭据，再把它作为 S3 兼容存储接入。",
  },
  alternates: {
    canonical: getLocalizedUrl("zh", "storages/neon"),
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
            name: "如何在 Databasus 中使用 Neon Object Storage",
            description:
              "用 Databasus 把 PostgreSQL 备份存到 Neon Object Storage 的分步指南",
            step: [
              {
                "@type": "HowToStep",
                name: "创建存储桶",
                text: "在 Neon Console 中打开项目，选择一个分支，进入 Object storage 标签页并点击 New bucket。访问级别保持 private。",
              },
              {
                "@type": "HowToStep",
                name: "获取 S3 凭据",
                text: "点击 Connect，打开 Storage 标签页，选择 Parameters only，然后点击 Reveal credential。复制 AWS_ENDPOINT_URL_S3、AWS_REGION、AWS_ACCESS_KEY_ID 和 AWS_SECRET_ACCESS_KEY。",
              },
              {
                "@type": "HowToStep",
                name: "填写 S3 存储表单",
                text: "在 Databasus 中添加一个 S3 存储，填入 Neon 提供的存储桶名称、区域、访问密钥、秘密访问密钥和端点。",
              },
              {
                "@type": "HowToStep",
                name: "保持路径式寻址",
                text: "不要勾选“虚拟主机”，存储类别保持默认值。",
              },
              {
                "@type": "HowToStep",
                name: "测试并保存",
                text: "点击“测试连接”，然后保存存储。",
              },
            ],
          }),
        }}
      />

      <DocsNavbarComponent lang="zh" />

      <div className="flex min-h-screen bg-[#0F1115]">
        {/* Sidebar */}
        <DocsSidebarComponent lang="zh" />

        {/* Main Content */}
        <main className="flex-1 min-w-0 px-4 py-6 sm:px-6 sm:py-8 lg:px-12">
          <div className="mx-auto max-w-4xl">
            <article className="prose prose-blue max-w-none">
              <h1 id="neon">Neon Object Storage</h1>

              <p className="text-lg text-gray-400">
                Neon Object Storage 是一种 S3 兼容存储，归属于 Neon
                项目中的某个分支。Databasus 通过常规的 S3
                存储类型连接它，所以你只需要一个存储桶、一组凭据和该分支的端点。
              </p>

              <h2 id="before-you-start">开始之前</h2>

              <p>
                你需要一个位于
                <a
                  href="https://neon.com/docs/storage/overview"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  支持 Object Storage 的区域
                </a>
                的 Neon 项目。
              </p>

              <h2 id="configuration-steps">配置步骤</h2>

              <h3 id="create-bucket">1. 创建存储桶</h3>

              <p>
                在 Neon Console 中打开项目，选择用来存放备份的分支，进入{" "}
                <strong>Object storage</strong> 标签页。点击{" "}
                <strong>New bucket</strong>，输入名称（例如{" "}
                <code>databasus-backups</code>），访问级别保持{" "}
                <strong>private</strong>，然后点击 <strong>Create</strong>。
              </p>

              <p>
                用{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://neon.com/docs/storage/buckets#create-a-bucket"
                >
                  Neon CLI
                </a>{" "}
                只需一条命令：
              </p>

              <pre>
                <code>neon buckets create databasus-backups</code>
              </pre>

              <h3 id="get-credentials">2. 获取 S3 凭据</h3>

              <p>
                点击 <strong>Connect</strong>，打开 <strong>Storage</strong>{" "}
                标签页。选择 <strong>.env</strong> 标签页，你会看到四个值：
              </p>

              <pre>
                <code>{`AWS_ENDPOINT_URL_S3=https://br-cool-darkness-a1b2c3d4.storage.c-1.us-east-2.aws.neon.tech
AWS_REGION=us-east-2
AWS_ACCESS_KEY_ID=nak_live_...
AWS_SECRET_ACCESS_KEY=...`}</code>
              </pre>

              <p>
                如果想给 Databasus 一组可以单独吊销的凭据，可以用 Neon CLI
                创建。它需要两个存储 scope，因为 Databasus
                会读回备份，并按保留策略删除备份：
              </p>

              <pre>
                <code>
                  {
                    "neon credentials create --scope storage:read --scope storage:write --name databasus"
                  }
                </code>
              </pre>

              <p>
                命令输出中，<code>token_id</code> 是访问密钥，
                <code>s3_secret_access_key</code> 是秘密访问密钥。Neon
                只显示一次密钥（通过 CLI），请立即复制。
              </p>

              <h3 id="fill-storage-form">3. 填写 S3 存储表单</h3>

              <p>
                在 Databasus 中添加新存储，选择 <strong>S3</strong>
                ，然后填写以下字段：
              </p>

              <table>
                <thead>
                  <tr>
                    <th>Databasus 字段</th>
                    <th>Neon 中的值</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>S3 存储桶</td>
                    <td data-label="Neon 中的值">
                      存储桶名称，例如 <code>databasus-backups</code>
                    </td>
                  </tr>
                  <tr>
                    <td>区域</td>
                    <td data-label="Neon 中的值">
                      <code>AWS_REGION</code>，例如 <code>us-east-2</code>
                    </td>
                  </tr>
                  <tr>
                    <td>访问密钥</td>
                    <td data-label="Neon 中的值">
                      <code>AWS_ACCESS_KEY_ID</code>
                    </td>
                  </tr>
                  <tr>
                    <td>秘密访问密钥</td>
                    <td data-label="Neon 中的值">
                      <code>AWS_SECRET_ACCESS_KEY</code>
                    </td>
                  </tr>
                  <tr>
                    <td>端点</td>
                    <td data-label="Neon 中的值">
                      <code>AWS_ENDPOINT_URL_S3</code>，包含{" "}
                      <code>https://</code>
                    </td>
                  </tr>
                </tbody>
              </table>

              <h3 id="advanced-settings">4. 检查高级设置</h3>

              <p>
                Neon 只接受路径式（path-style）请求。不要勾选
                <strong>虚拟主机</strong>
                ：启用后，存储桶名称会成为主机名的一部分，连接测试会因 TLS
                证书错误而失败。
              </p>

              <p>
                <strong>存储类别</strong>保持默认值即可。Neon
                没有存储类别，会忽略这个设置。如果想在一个存储桶里存放多个
                Databasus 实例的备份，<strong>文件夹前缀</strong>照常可用。
              </p>

              <h3 id="test-connection">5. 测试并保存</h3>

              <p>
                点击<strong>测试连接</strong>。Databasus
                会向存储桶写入一个小测试文件，读回后再删除。测试通过后，保存存储。
              </p>

              <p>
                现在 Databasus 已可以使用 Neon Object Storage 存放你的
                PostgreSQL 备份。
              </p>

              <h2 id="branches">分支与备份</h2>

              <p>
                端点和凭据属于同一个分支，Databasus
                始终写入该分支。之后从该分支创建的子分支上，这组凭据同样有效。
              </p>

              <ul>
                <li>
                  新建的子分支会获得存储桶在创建时刻的写时复制（copy-on-write）快照。之后写入的备份只出现在父分支上。
                </li>
                <li>删除分支或项目会同时删除其中的存储桶和全部备份。</li>
              </ul>

              {/* Navigation */}
              <div className="mt-12 border-t border-gray-200 pt-8">
                <a
                  href="/zh/storages"
                  className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-800"
                >
                  ← 返回存储列表
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
