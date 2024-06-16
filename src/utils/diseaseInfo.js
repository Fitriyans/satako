function getDiseaseInfo(classIndex) {
    const diseases = [
        {
            name: 'Leaf Blight',
            description: 'Leaf blight is a fungal disease that affects various plant species, including trees and crops. Leaf Blight is marked by dead spots or streaks on the leaves, often accompanied by seed rot and seedling blight, which can lead to significant loss of plant production due to inhibition of photosynthesis and weakening or death of the plant.',
            causes: 'Temperature, moisture and host susceptibility',
            solutions: [
                'Remove diseased leaves as soon as they appear; any delay may kill the plants',
                'Improve air circulation to allow leaves to move freely and breathe around plants',
                'Mulch around the base of the plant to reduce water splashing.',
                'Do not use overhead watering, use sprinklers instead.',
                'Control weeds - regular pruning of unwanted plant growth is necessary',
                'Rotate crops each year and do not plant in the same spot where a blight occurred.'
            ]
        },
        {
            name: 'Leaf Rust',
            description: 'Leaf rust is a common fungal disease that affects foliage and causes yellow and orange spots, or "rust," to appear on the leaves. These spots are actually the reproductive structures of the fungus that burst through the leaf surface and release spores. The disease can have a significant impact on plant health and crop yield, making it an important subject of study for anyone interested in plant pathology, agriculture, or microbiology.',
            causes: 'Temperature, moisture and host susceptibility',
            solutions: [
                'Plant non-susceptible crop varieties',
                'Restrict movement in and out of plantations of susceptible crops.',
                'Farm weeding - Most food crops are affected by weeds. Some weeds are alternative hosts for rust. Weeding removes competition for the crop and potential hosts.',
                'Pruning - in crops such as coffee, pruning helps to improve air circulation, which prevents moisture from accumulating on the leaves.'
            ]
        },
        {
            name: 'Leaf Spot',
            description: 'Leaf spot is a small, discolored, and diseased area on a leaf. It may be caused by fungal, bacterial, or viral infections affecting plants. Additionally, leaf spots can also arise from damage inflicted by nematodes, insects, environmental conditions, toxins, or herbicides.',
            causes: 'Fungal Pathogens, Bacterial Pathogens, Environmental Factors, Viral Pathogens, Nematodes.',
            solutions: [
                'Cultural controls: proper spacing, watering, sanitation, crop rotation, resistant varieties',
                'Biological controls: beneficial microbes, compost tea',
                'Chemical controls: fungicides, bactericides',
                'Monitoring and early detection',
                'Remove and destroy any heavily infested plants',
                'Do not re-use growing media or pots',
                'Clean tools and equipment',
                'Control weeds'
            ]
        }
    ];
    return diseases[classIndex];
}

module.exports = getDiseaseInfo;
