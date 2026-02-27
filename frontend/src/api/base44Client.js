// Mock base44 client to prevent crashes in legacy pages
export const base44 = {
  auth: {
    me: async () => null,
    logout: () => { window.location.href = '/login'; },
    redirectToLogin: () => { window.location.href = '/login'; },
    onAuthStateChange: () => (() => { }),
  },
  entities: {
    FixedRoute: {
      filter: async () => [],
      get: async () => ({}),
    },
    Trip: {
      filter: async () => [],
      get: async () => ({}),
      create: async () => ({}),
    },
    Booking: {
      filter: async () => [],
      create: async () => ({}),
    },
    Wallet: {
      get: async () => ({ balance: 0 }),
    },
    User: {
      filter: async () => [],
      get: async () => ({}),
    },
    UserContributionTier: {
      filter: async () => [],
      list: async () => [],
    },
    DriverProfile: {
      list: async () => [],
      get: async () => ({}),
    },
  },
  functions: {
    invoke: async () => ({ data: { success: true } }),
  },
  storage: {
    upload: async () => ({ url: '' }),
  }
};

export const createClient = () => base44;
