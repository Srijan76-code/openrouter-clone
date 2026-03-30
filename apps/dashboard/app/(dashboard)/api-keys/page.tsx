import { Key } from "lucide-react";
import ApiKeysClient from "@/components/api-keys/ApiKeysClient";

export default function ApiKeysPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
            <Key className="w-8 h-8 text-primary" />
            API Keys
          </h1>
          <p className="text-muted-foreground font-medium">Manage your security credentials and access tokens.</p>
        </div>
      </div>

      {/* Main Client Component */}
      <ApiKeysClient />
    </div>
  );
}

