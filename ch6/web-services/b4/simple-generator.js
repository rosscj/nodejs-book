function* recursiveGenerator(node) {
    if (node.type === 'root') {
        for (var i = 0; i < node.value.length; ++i) {
            var subnode = node.value[i];

            for (var suffix of recursiveGenerator(subnode)) {
                yield suffix;
            }
        }
    }

    else {
        yield node.value;
    }
}

for (generated of recursiveGenerator(nodes)) {
    console.log(generated);
}