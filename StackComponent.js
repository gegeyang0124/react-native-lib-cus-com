

export let Components = {};
/**
 * 组件构造方法，构造所需的组件
 * @param comJson Json;//是组件的json对象
 * **/
export async function ComponentConstructor(comJson={}) {
    Components = Object.assign(Components,comJson);
    return await Components;
}