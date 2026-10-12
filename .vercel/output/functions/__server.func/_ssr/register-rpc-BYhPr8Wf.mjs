import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register-rpc-BYhPr8Wf.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var REGISTER_ID = "office";
var loadOfficeRegister_createServerFn_handler = createServerRpc({
	id: "631451c2921c39eebf5b08e6e1e50e2029a370812f9ee3f54abd409313dcc3d1",
	name: "loadOfficeRegister",
	filename: "src/lib/school/register-rpc.ts"
}, (opts) => loadOfficeRegister.__executeServer(opts));
var loadOfficeRegister = createServerFn({ method: "GET" }).handler(loadOfficeRegister_createServerFn_handler, async () => {
	const { getSql } = await import("./db-DdQ28dUh.mjs");
	const row = (await (await getSql()).query("select id, data, updated_at from school_register where id = $1 limit 1", [REGISTER_ID]))[0];
	if (!row) return {
		updatedAt: null,
		payload: null
	};
	const payload = typeof row.data === "string" ? row.data : JSON.stringify(row.data);
	return {
		updatedAt: row.updated_at,
		payload
	};
});
var saveOfficeRegister_createServerFn_handler = createServerRpc({
	id: "20493688b84a67f29b26aefa5b684cae531aa1de48efb8ab397ab74ddf747750",
	name: "saveOfficeRegister",
	filename: "src/lib/school/register-rpc.ts"
}, (opts) => saveOfficeRegister.__executeServer(opts));
var saveOfficeRegister = createServerFn({ method: "POST" }).validator((input) => input).handler(saveOfficeRegister_createServerFn_handler, async ({ data }) => {
	JSON.parse(data.payload);
	const { getSql } = await import("./db-DdQ28dUh.mjs");
	await (await getSql()).query(`insert into school_register (id, data, updated_at)
       values ($1, $2::jsonb, $3::timestamptz)
       on conflict (id) do update set data = excluded.data, updated_at = excluded.updated_at`, [
		REGISTER_ID,
		data.payload,
		data.updatedAt
	]);
	return {
		ok: true,
		updatedAt: data.updatedAt
	};
});
//#endregion
export { loadOfficeRegister_createServerFn_handler, saveOfficeRegister_createServerFn_handler };
