import { PrismaService } from '../prisma/prisma.service';

/**
 * Base Repository
 * 
 * Abstract base class providing common CRUD operations.
 * Extends this class for model-specific repositories.
 * 
 * Usage:
 *   export class UserRepository extends BaseRepository<User, Prisma.UserWhereUniqueInput> {
 *     constructor(prisma: PrismaService) {
 *       super(prisma, 'user');
 *     }
 *   }
 */
export abstract class BaseRepository<T, WhereUniqueInput> {
    constructor(
        protected readonly prisma: PrismaService,
        protected readonly modelName: string,
    ) { }

    /**
     * Get the Prisma model delegate
     */
    protected get model() {
        return (this.prisma as any)[this.modelName];
    }

    /**
     * Find a single record by unique identifier
     */
    async findById(where: WhereUniqueInput): Promise<T | null> {
        return this.model.findUnique({ where });
    }

    /**
     * Find a single record by unique identifier or throw
     */
    async findByIdOrThrow(where: WhereUniqueInput): Promise<T> {
        return this.model.findUniqueOrThrow({ where });
    }

    /**
     * Find multiple records with optional filtering and pagination
     */
    async findMany(params?: {
        where?: Record<string, any>;
        orderBy?: Record<string, 'asc' | 'desc'>;
        skip?: number;
        take?: number;
        include?: Record<string, boolean>;
    }): Promise<T[]> {
        return this.model.findMany(params);
    }

    /**
     * Create a new record
     */
    async create(data: Record<string, any>, include?: Record<string, boolean>): Promise<T> {
        return this.model.create({ data, include });
    }

    /**
     * Update a record by unique identifier
     */
    async update(
        where: WhereUniqueInput,
        data: Record<string, any>,
    ): Promise<T> {
        return this.model.update({ where, data });
    }

    /**
     * Delete a record by unique identifier
     */
    async delete(where: WhereUniqueInput): Promise<T> {
        return this.model.delete({ where });
    }

    /**
     * Count records with optional filtering
     */
    async count(where?: Record<string, any>): Promise<number> {
        return this.model.count({ where });
    }

    /**
     * Check if a record exists
     */
    async exists(where: Record<string, any>): Promise<boolean> {
        const count = await this.model.count({ where });
        return count > 0;
    }

    /**
     * Paginated find with metadata
     */
    async paginate(params: {
        where?: Record<string, any>;
        orderBy?: Record<string, 'asc' | 'desc'>;
        page?: number;
        perPage?: number;
        include?: Record<string, boolean>;
    }): Promise<{
        data: T[];
        meta: {
            total: number;
            page: number;
            perPage: number;
            totalPages: number;
        };
    }> {
        const page = params.page ?? 1;
        const perPage = params.perPage ?? 10;
        const skip = (page - 1) * perPage;

        const [data, total] = await Promise.all([
            this.model.findMany({
                where: params.where,
                orderBy: params.orderBy,
                skip,
                take: perPage,
                include: params.include,
            }),
            this.model.count({ where: params.where }),
        ]);

        return {
            data,
            meta: {
                total,
                page,
                perPage,
                totalPages: Math.ceil(total / perPage),
            },
        };
    }
}
