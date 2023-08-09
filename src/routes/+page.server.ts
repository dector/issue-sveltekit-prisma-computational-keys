import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const load = async () => {
    await prisma.user.create({
        data: {
            name: "U" + new Date().getTime(),
        },
    });

    // Don't work
    const prismax = prisma.$extends({
        result: {
            user: {
                greet: {
                    needs: { name: true },
                    compute(user) {
                        return `Hello, ${user.name}!`;
                    },
                },
            },
        },
    });
    const users = await prismax.user.findMany();
    return { users };

    // Works
    // const users = (await prisma.user.findMany()).map((it) => ({
    //     ...it,
    //     greet: `Hello, ${it.name}!`,
    // }));
    // return { users };
};
