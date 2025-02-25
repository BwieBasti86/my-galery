let configLocation = undefined;
const apilocation = "http://localhost:3000";
const endpoints = {
  saveProfile: "/addCompanyProfile",
  setCurrent: "/current",
  deleteProfile: "/deleteCompanyProfile",
};
const baseRequest = async (request) => {
  let result = {};
  let options = {
    method: request.method,
    headers: { "Content-Type": "application/json" },
  };
  if (request.data && request.method === "POST") {
    Object.assign(options, {
      body: JSON.stringify(Object.assign(request.data, { filePath: configLocation })),
    });
  }
  try {
    const promise = await fetch(request.url, options);
    result.status = promise.ok;
    if (promise.ok) {
      result.response = await promise.json();
    }
  } catch (e) {
    result.status = false;
    result.error = e;
  }
  return result;
};

const api = {
  init(args) {
    configLocation = args.configLocation;
  },

  async saveProfile(companyProfile) {
    //Object
    const url = apilocation + endpoints.saveProfile;
    return await baseRequest({
      url: url,
      method: "POST",
      data: companyProfile,
    });
  },
  async deleteProfile(companyId) {
    //string
    const url = apilocation + endpoints.deleteProfile;
    return await baseRequest({
      url: url,
      method: "POST",
      data: { companyId: companyId },
    });
  },
  async updateCurrent(companyId) {
    //string
    const url = apilocation + endpoints.setCurrent;
    return await baseRequest({
      url: url,
      method: "POST",
      data: { current: companyId },
    });
  },
};

export default api;
