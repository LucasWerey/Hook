function Resolver() {
  return {
    type: 'component',
    resolve: (name) => {
      return { name, from: '@lucaswerey/dslib-pfe' }
    }
  }
}

module.exports = {
  deep: true,
  dts: 'src/components.d.ts',
  resolvers: [Resolver()]
}
