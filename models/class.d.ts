declare function _exports(sequelize: any, DataTypes: any): {
    new (values?: import("sequelize").Optional<any, string>, options?: import("sequelize").BuildOptions): {
        _attributes: any;
        dataValues: any;
        _creationAttributes: any;
        isNewRecord: boolean;
        sequelize: import("sequelize").Sequelize;
        where(): object;
        getDataValue<K extends string | number | symbol>(key: K): any;
        setDataValue<K_1 extends string | number | symbol>(key: K_1, value: any): void;
        get(options?: {
            plain?: boolean;
            clone?: boolean;
        }): any;
        get<K_2 extends keyof any>(key: K_2, options?: {
            plain?: boolean;
            clone?: boolean;
        }): any[K_2];
        get(key: string, options?: {
            plain?: boolean;
            clone?: boolean;
        }): unknown;
        set<K_3 extends string | number | symbol>(key: K_3, value: any, options?: import("sequelize").SetOptions): any;
        set(keys: Partial<any>, options?: import("sequelize").SetOptions): any;
        setAttributes<K_4 extends string | number | symbol>(key: K_4, value: any, options?: import("sequelize").SetOptions): any;
        setAttributes(keys: Partial<any>, options?: import("sequelize").SetOptions): any;
        changed<K_5 extends keyof any>(key: K_5): boolean;
        changed<K_6 extends keyof any>(key: K_6, dirty: boolean): void;
        changed(): false | string[];
        previous(): Partial<any>;
        previous<K_7 extends string | number | symbol>(key: K_7): any;
        save(options?: import("sequelize").SaveOptions<any>): Promise<any>;
        reload(options?: import("sequelize").FindOptions<any>): Promise<any>;
        validate(options?: import("sequelize/types/instance-validator").ValidationOptions): Promise<void>;
        update<K_8 extends string | number | symbol>(key: K_8, value: any, options?: import("sequelize").InstanceUpdateOptions<any>): Promise<any>;
        update(keys: {
            [x: string]: any;
        }, options?: import("sequelize").InstanceUpdateOptions<any>): Promise<any>;
        destroy(options?: import("sequelize").InstanceDestroyOptions): Promise<void>;
        restore(options?: import("sequelize").InstanceRestoreOptions): Promise<void>;
        increment<K_9 extends string | number | symbol>(fields: Partial<any> | K_9 | readonly K_9[], options?: import("sequelize").IncrementDecrementOptionsWithBy<any>): Promise<any>;
        decrement<K_10 extends string | number | symbol>(fields: Partial<any> | K_10 | readonly K_10[], options?: import("sequelize").IncrementDecrementOptionsWithBy<any>): Promise<any>;
        equals(other: any): boolean;
        equalsOneOf(others: readonly any[]): boolean;
        toJSON<T extends any>(): T;
        toJSON(): object;
        isSoftDeleted(): boolean;
        _model: Model<any, any>;
        addHook<K_11 extends keyof import("sequelize/types/hooks").SequelizeHooks<M, TModelAttributes, TCreationAttributes>>(hookType: K_11, name: string, fn: import("sequelize/types/hooks").SequelizeHooks<Model<any, any>, any, any>[K_11]): any;
        addHook<K_12 extends keyof import("sequelize/types/hooks").SequelizeHooks<M, TModelAttributes, TCreationAttributes>>(hookType: K_12, fn: import("sequelize/types/hooks").SequelizeHooks<Model<any, any>, any, any>[K_12]): any;
        removeHook<K_13 extends keyof import("sequelize/types/hooks").SequelizeHooks<M, TModelAttributes, TCreationAttributes>>(hookType: K_13, name: string): any;
        hasHook<K_14 extends keyof import("sequelize/types/hooks").SequelizeHooks<M, TModelAttributes, TCreationAttributes>>(hookType: K_14): boolean;
        hasHooks<K_15 extends keyof import("sequelize/types/hooks").SequelizeHooks<M, TModelAttributes, TCreationAttributes>>(hookType: K_15): boolean;
    };
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    associate(models: any): void;
    readonly tableName: string;
    readonly primaryKeyAttribute: string;
    readonly primaryKeyAttributes: readonly string[];
    readonly associations: {
        [key: string]: import("sequelize").Association<Model<any, any>, Model<any, any>>;
    };
    readonly options: import("sequelize").InitOptions<Model<any, any>>;
    readonly rawAttributes: {
        [attribute: string]: import("sequelize").ModelAttributeColumnOptions<Model<any, any>>;
    };
    getAttributes<M_1 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_1>): import("sequelize").Attributes<M_1> extends infer T_1 ? { readonly [Key in keyof T_1]: import("sequelize").ModelAttributeColumnOptions<Model<any, any>>; } : never;
    readonly sequelize?: import("sequelize").Sequelize;
    init<MS extends import("sequelize").ModelStatic<Model<any, any>>, M_2 extends InstanceType<MS>>(this: MS, attributes: import("sequelize").ModelAttributes<M_2, import("sequelize").Optional<import("sequelize").Attributes<M_2>, (import("sequelize").Attributes<M_2> extends infer T_2 ? { [P in keyof T_2]-?: (keyof NonNullable<import("sequelize").Attributes<M_2>[P]> extends Exclude<keyof NonNullable<import("sequelize").Attributes<M_2>[P]>, unique symbol> ? false : true) extends true ? P : never; } : never)[keyof import("sequelize").Attributes<M_2>]>>, options: import("sequelize").InitOptions<M_2>): MS;
    removeAttribute(attribute: string): void;
    sync<M_3 extends Model<any, any>>(options?: import("sequelize").SyncOptions): Promise<M_3>;
    drop(options?: import("sequelize").DropOptions): Promise<void>;
    schema<M_4 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_4>, schema: string, options?: import("sequelize").SchemaOptions): import("sequelize").ModelCtor<M_4>;
    getTableName(): string | {
        tableName: string;
        schema: string;
        delimiter: string;
    };
    scope<M_5 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_5>, options?: string | import("sequelize").ScopeOptions | import("sequelize").WhereAttributeHash<M_5> | readonly (string | import("sequelize").ScopeOptions)[]): import("sequelize").ModelCtor<M_5>;
    addScope<M_6 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_6>, name: string, scope: import("sequelize").FindOptions<import("sequelize").Attributes<M_6>>, options?: import("sequelize").AddScopeOptions): void;
    addScope<M_7 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_7>, name: string, scope: (...args: readonly any[]) => import("sequelize").FindOptions<import("sequelize").Attributes<M_7>>, options?: import("sequelize").AddScopeOptions): void;
    findAll<M_8 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_8>, options?: import("sequelize").FindOptions<import("sequelize").Attributes<M_8>>): Promise<M_8[]>;
    findByPk<M_9 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_9>, identifier: import("sequelize").Identifier, options: Omit<import("sequelize").NonNullFindOptions<import("sequelize").Attributes<M_9>>, "where">): Promise<M_9>;
    findByPk<M_10 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_10>, identifier?: import("sequelize").Identifier, options?: Omit<import("sequelize").FindOptions<import("sequelize").Attributes<M_10>>, "where">): Promise<M_10>;
    findOne<M_11 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_11>, options: import("sequelize").NonNullFindOptions<import("sequelize").Attributes<M_11>>): Promise<M_11>;
    findOne<M_12 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_12>, options?: import("sequelize").FindOptions<import("sequelize").Attributes<M_12>>): Promise<M_12>;
    aggregate<T_3, M_13 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_13>, field: keyof import("sequelize").Attributes<M_13> | "*", aggregateFunction: string, options?: import("sequelize").AggregateOptions<T_3, import("sequelize").Attributes<M_13>>): Promise<T_3>;
    count<M_14 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_14>, options: {
        include?: import("sequelize").Includeable | import("sequelize").Includeable[];
        col?: string;
        attributes?: import("sequelize").FindAttributeOptions;
        transaction?: import("sequelize").Transaction;
        logging?: boolean | ((sql: string, timing?: number) => void);
        benchmark?: boolean;
        useMaster?: boolean;
        where?: import("sequelize").WhereOptions<import("sequelize").Attributes<M_14>>;
        paranoid?: boolean;
        distinct?: boolean;
        group: import("sequelize").GroupOption;
    }): Promise<import("sequelize").GroupedCountResultItem[]>;
    count<M_15 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_15>, options?: Omit<import("sequelize").CountOptions<import("sequelize").Attributes<M_15>>, "group">): Promise<number>;
    findAndCountAll<M_16 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_16>, options?: Omit<import("sequelize").FindAndCountOptions<import("sequelize").Attributes<M_16>>, "group">): Promise<{
        rows: M_16[];
        count: number;
    }>;
    findAndCountAll<M_17 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_17>, options: {
        raw?: boolean;
        type?: string;
        offset?: number;
        include?: import("sequelize").Includeable | import("sequelize").Includeable[];
        order?: import("sequelize").Order;
        col?: string;
        attributes?: import("sequelize").FindAttributeOptions;
        limit?: number;
        groupedLimit?: unknown;
        lock?: boolean | import("sequelize").LOCK | {
            level: import("sequelize").LOCK;
            of: import("sequelize").ModelStatic<Model<any, any>>;
        };
        skipLocked?: boolean;
        having?: import("sequelize").WhereOptions<any>;
        subQuery?: boolean;
        nest?: boolean;
        plain?: boolean;
        replacements?: import("sequelize").BindOrReplacements;
        bind?: import("sequelize").BindOrReplacements;
        instance?: Model<any, any>;
        mapToModel?: boolean;
        retry?: import("retry-as-promised").Options;
        fieldMap?: import("sequelize").FieldMap;
        transaction?: import("sequelize").Transaction;
        logging?: boolean | ((sql: string, timing?: number) => void);
        benchmark?: boolean;
        useMaster?: boolean;
        where?: import("sequelize").WhereOptions<import("sequelize").Attributes<M_17>>;
        paranoid?: boolean;
        distinct?: boolean;
        indexHints?: import("sequelize").IndexHint[];
        group: import("sequelize").GroupOption;
    }): Promise<{
        rows: M_17[];
        count: import("sequelize").GroupedCountResultItem[];
    }>;
    max<T_4 extends unknown, M_18 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_18>, field: keyof import("sequelize").Attributes<M_18>, options?: import("sequelize").AggregateOptions<T_4, import("sequelize").Attributes<M_18>>): Promise<T_4>;
    min<T_5 extends unknown, M_19 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_19>, field: keyof import("sequelize").Attributes<M_19>, options?: import("sequelize").AggregateOptions<T_5, import("sequelize").Attributes<M_19>>): Promise<T_5>;
    sum<T_6 extends unknown, M_20 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_20>, field: keyof import("sequelize").Attributes<M_20>, options?: import("sequelize").AggregateOptions<T_6, import("sequelize").Attributes<M_20>>): Promise<number>;
    build<M_21 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_21>, record?: import("sequelize/types/utils").MakeNullishOptional<M_21["_creationAttributes"]>, options?: import("sequelize").BuildOptions): M_21;
    bulkBuild<M_22 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_22>, records: readonly import("sequelize/types/utils").MakeNullishOptional<M_22["_creationAttributes"]>[], options?: import("sequelize").BuildOptions): M_22[];
    create<M_23 extends Model<any, any>, O extends import("sequelize").CreateOptions<import("sequelize").Attributes<M_23>> = import("sequelize").CreateOptions<import("sequelize").Attributes<M_23>>>(this: import("sequelize").ModelStatic<M_23>, values?: import("sequelize/types/utils").MakeNullishOptional<M_23["_creationAttributes"]>, options?: O): Promise<O extends {
        returning: false;
    } | {
        ignoreDuplicates: true;
    } ? void : M_23>;
    findOrBuild<M_24 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_24>, options: import("sequelize").FindOrBuildOptions<import("sequelize").Attributes<M_24>, import("sequelize/types/utils").MakeNullishOptional<M_24["_creationAttributes"]>>): Promise<[M_24, boolean]>;
    findOrCreate<M_25 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_25>, options: import("sequelize").FindOrCreateOptions<import("sequelize").Attributes<M_25>, import("sequelize/types/utils").MakeNullishOptional<M_25["_creationAttributes"]>>): Promise<[M_25, boolean]>;
    findCreateFind<M_26 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_26>, options: import("sequelize").FindOrCreateOptions<import("sequelize").Attributes<M_26>, import("sequelize/types/utils").MakeNullishOptional<M_26["_creationAttributes"]>>): Promise<[M_26, boolean]>;
    upsert<M_27 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_27>, values: import("sequelize/types/utils").MakeNullishOptional<M_27["_creationAttributes"]>, options?: import("sequelize").UpsertOptions<import("sequelize").Attributes<M_27>>): Promise<[M_27, boolean]>;
    bulkCreate<M_28 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_28>, records: readonly import("sequelize/types/utils").MakeNullishOptional<M_28["_creationAttributes"]>[], options?: import("sequelize").BulkCreateOptions<import("sequelize").Attributes<M_28>>): Promise<M_28[]>;
    truncate<M_29 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_29>, options?: import("sequelize").TruncateOptions<import("sequelize").Attributes<M_29>>): Promise<void>;
    destroy<M_30 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_30>, options?: import("sequelize").DestroyOptions<import("sequelize").Attributes<M_30>>): Promise<number>;
    restore<M_31 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_31>, options?: import("sequelize").RestoreOptions<import("sequelize").Attributes<M_31>>): Promise<void>;
    update<M_32 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_32>, values: import("sequelize").Attributes<M_32> extends infer T_7 ? { [key in keyof T_7]?: import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | import("sequelize").Attributes<M_32>[key]; } : never, options: Omit<import("sequelize").UpdateOptions<import("sequelize").Attributes<M_32>>, "returning"> & {
        returning: true | (keyof import("sequelize").Attributes<M_32>)[];
    }): Promise<[affectedCount: number, affectedRows: M_32[]]>;
    update<M_33 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_33>, values: import("sequelize").Attributes<M_33> extends infer T_8 ? { [key_1 in keyof T_8]?: import("sequelize/types/utils").Fn | import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | import("sequelize").Attributes<M_33>[key_1]; } : never, options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M_33>>): Promise<[affectedCount: number]>;
    increment<M_34 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_34>, fields: import("sequelize").AllowReadonlyArray<keyof import("sequelize").Attributes<M_34>>, options: import("sequelize").IncrementDecrementOptionsWithBy<import("sequelize").Attributes<M_34>>): Promise<[affectedRows: M_34[], affectedCount?: number]>;
    increment<M_35 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_35>, fields: import("sequelize").Attributes<M_35> extends infer T_9 ? { [key_2 in keyof T_9]?: number; } : never, options: import("sequelize").IncrementDecrementOptions<import("sequelize").Attributes<M_35>>): Promise<[affectedRows: M_35[], affectedCount?: number]>;
    decrement<M_36 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_36>, fields: import("sequelize").AllowReadonlyArray<keyof import("sequelize").Attributes<M_36>>, options: import("sequelize").IncrementDecrementOptionsWithBy<import("sequelize").Attributes<M_36>>): Promise<[affectedRows: M_36[], affectedCount?: number]>;
    decrement<M_37 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_37>, fields: import("sequelize").Attributes<M_37> extends infer T_10 ? { [key_3 in keyof T_10]?: number; } : never, options: import("sequelize").IncrementDecrementOptions<import("sequelize").Attributes<M_37>>): Promise<[affectedRows: M_37[], affectedCount?: number]>;
    describe(): Promise<object>;
    unscoped<M_38 extends import("sequelize").ModelType<any, any>>(this: M_38): M_38;
    beforeValidate<M_39 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_39>, name: string, fn: (instance: M_39, options: import("sequelize/types/instance-validator").ValidationOptions) => import("sequelize/types/hooks").HookReturn): void;
    beforeValidate<M_40 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_40>, fn: (instance: M_40, options: import("sequelize/types/instance-validator").ValidationOptions) => import("sequelize/types/hooks").HookReturn): void;
    afterValidate<M_41 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_41>, name: string, fn: (instance: M_41, options: import("sequelize/types/instance-validator").ValidationOptions) => import("sequelize/types/hooks").HookReturn): void;
    afterValidate<M_42 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_42>, fn: (instance: M_42, options: import("sequelize/types/instance-validator").ValidationOptions) => import("sequelize/types/hooks").HookReturn): void;
    beforeCreate<M_43 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_43>, name: string, fn: (instance: M_43, options: import("sequelize").CreateOptions<import("sequelize").Attributes<M_43>>) => import("sequelize/types/hooks").HookReturn): void;
    beforeCreate<M_44 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_44>, fn: (instance: M_44, options: import("sequelize").CreateOptions<import("sequelize").Attributes<M_44>>) => import("sequelize/types/hooks").HookReturn): void;
    afterCreate<M_45 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_45>, name: string, fn: (instance: M_45, options: import("sequelize").CreateOptions<import("sequelize").Attributes<M_45>>) => import("sequelize/types/hooks").HookReturn): void;
    afterCreate<M_46 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_46>, fn: (instance: M_46, options: import("sequelize").CreateOptions<import("sequelize").Attributes<M_46>>) => import("sequelize/types/hooks").HookReturn): void;
    beforeDestroy<M_47 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_47>, name: string, fn: (instance: M_47, options: import("sequelize").InstanceDestroyOptions) => import("sequelize/types/hooks").HookReturn): void;
    beforeDestroy<M_48 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_48>, fn: (instance: M_48, options: import("sequelize").InstanceDestroyOptions) => import("sequelize/types/hooks").HookReturn): void;
    afterDestroy<M_49 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_49>, name: string, fn: (instance: M_49, options: import("sequelize").InstanceDestroyOptions) => import("sequelize/types/hooks").HookReturn): void;
    afterDestroy<M_50 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_50>, fn: (instance: M_50, options: import("sequelize").InstanceDestroyOptions) => import("sequelize/types/hooks").HookReturn): void;
    beforeUpdate<M_51 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_51>, name: string, fn: (instance: M_51, options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M_51>>) => import("sequelize/types/hooks").HookReturn): void;
    beforeUpdate<M_52 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_52>, fn: (instance: M_52, options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M_52>>) => import("sequelize/types/hooks").HookReturn): void;
    afterUpdate<M_53 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_53>, name: string, fn: (instance: M_53, options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M_53>>) => import("sequelize/types/hooks").HookReturn): void;
    afterUpdate<M_54 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_54>, fn: (instance: M_54, options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M_54>>) => import("sequelize/types/hooks").HookReturn): void;
    beforeSave<M_55 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_55>, name: string, fn: (instance: M_55, options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M_55>> | import("sequelize").SaveOptions<import("sequelize").Attributes<M_55>>) => import("sequelize/types/hooks").HookReturn): void;
    beforeSave<M_56 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_56>, fn: (instance: M_56, options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M_56>> | import("sequelize").SaveOptions<import("sequelize").Attributes<M_56>>) => import("sequelize/types/hooks").HookReturn): void;
    afterSave<M_57 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_57>, name: string, fn: (instance: M_57, options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M_57>> | import("sequelize").SaveOptions<import("sequelize").Attributes<M_57>>) => import("sequelize/types/hooks").HookReturn): void;
    afterSave<M_58 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_58>, fn: (instance: M_58, options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M_58>> | import("sequelize").SaveOptions<import("sequelize").Attributes<M_58>>) => import("sequelize/types/hooks").HookReturn): void;
    beforeBulkCreate<M_59 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_59>, name: string, fn: (instances: M_59[], options: import("sequelize").BulkCreateOptions<import("sequelize").Attributes<M_59>>) => import("sequelize/types/hooks").HookReturn): void;
    beforeBulkCreate<M_60 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_60>, fn: (instances: M_60[], options: import("sequelize").BulkCreateOptions<import("sequelize").Attributes<M_60>>) => import("sequelize/types/hooks").HookReturn): void;
    afterBulkCreate<M_61 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_61>, name: string, fn: (instances: readonly M_61[], options: import("sequelize").BulkCreateOptions<import("sequelize").Attributes<M_61>>) => import("sequelize/types/hooks").HookReturn): void;
    afterBulkCreate<M_62 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_62>, fn: (instances: readonly M_62[], options: import("sequelize").BulkCreateOptions<import("sequelize").Attributes<M_62>>) => import("sequelize/types/hooks").HookReturn): void;
    beforeBulkDestroy<M_63 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_63>, name: string, fn: (options: import("sequelize").BulkCreateOptions<import("sequelize").Attributes<M_63>>) => import("sequelize/types/hooks").HookReturn): void;
    beforeBulkDestroy<M_64 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_64>, fn: (options: import("sequelize").BulkCreateOptions<import("sequelize").Attributes<M_64>>) => import("sequelize/types/hooks").HookReturn): void;
    afterBulkDestroy<M_65 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_65>, name: string, fn: (options: import("sequelize").DestroyOptions<import("sequelize").Attributes<M_65>>) => import("sequelize/types/hooks").HookReturn): void;
    afterBulkDestroy<M_66 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_66>, fn: (options: import("sequelize").DestroyOptions<import("sequelize").Attributes<M_66>>) => import("sequelize/types/hooks").HookReturn): void;
    beforeBulkUpdate<M_67 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_67>, name: string, fn: (options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M_67>>) => import("sequelize/types/hooks").HookReturn): void;
    beforeBulkUpdate<M_68 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_68>, fn: (options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M_68>>) => import("sequelize/types/hooks").HookReturn): void;
    afterBulkUpdate<M_69 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_69>, name: string, fn: (options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M_69>>) => import("sequelize/types/hooks").HookReturn): void;
    afterBulkUpdate<M_70 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_70>, fn: (options: import("sequelize").UpdateOptions<import("sequelize").Attributes<M_70>>) => import("sequelize/types/hooks").HookReturn): void;
    beforeFind<M_71 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_71>, name: string, fn: (options: import("sequelize").FindOptions<import("sequelize").Attributes<M_71>>) => import("sequelize/types/hooks").HookReturn): void;
    beforeFind<M_72 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_72>, fn: (options: import("sequelize").FindOptions<import("sequelize").Attributes<M_72>>) => import("sequelize/types/hooks").HookReturn): void;
    beforeCount<M_73 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_73>, name: string, fn: (options: import("sequelize").CountOptions<import("sequelize").Attributes<M_73>>) => import("sequelize/types/hooks").HookReturn): void;
    beforeCount<M_74 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_74>, fn: (options: import("sequelize").CountOptions<import("sequelize").Attributes<M_74>>) => import("sequelize/types/hooks").HookReturn): void;
    beforeFindAfterExpandIncludeAll<M_75 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_75>, name: string, fn: (options: import("sequelize").FindOptions<import("sequelize").Attributes<M_75>>) => import("sequelize/types/hooks").HookReturn): void;
    beforeFindAfterExpandIncludeAll<M_76 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_76>, fn: (options: import("sequelize").FindOptions<import("sequelize").Attributes<M_76>>) => import("sequelize/types/hooks").HookReturn): void;
    beforeFindAfterOptions<M_77 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_77>, name: string, fn: (options: import("sequelize").FindOptions<import("sequelize").Attributes<M_77>>) => import("sequelize/types/hooks").HookReturn): void;
    beforeFindAfterOptions<M_78 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_78>, fn: (options: import("sequelize").FindOptions<import("sequelize").Attributes<M_78>>) => void): import("sequelize/types/hooks").HookReturn;
    afterFind<M_79 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_79>, name: string, fn: (instancesOrInstance: M_79 | readonly M_79[], options: import("sequelize").FindOptions<import("sequelize").Attributes<M_79>>) => import("sequelize/types/hooks").HookReturn): void;
    afterFind<M_80 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_80>, fn: (instancesOrInstance: M_80 | readonly M_80[], options: import("sequelize").FindOptions<import("sequelize").Attributes<M_80>>) => import("sequelize/types/hooks").HookReturn): void;
    beforeBulkSync(name: string, fn: (options: import("sequelize").SyncOptions) => import("sequelize/types/hooks").HookReturn): void;
    beforeBulkSync(fn: (options: import("sequelize").SyncOptions) => import("sequelize/types/hooks").HookReturn): void;
    afterBulkSync(name: string, fn: (options: import("sequelize").SyncOptions) => import("sequelize/types/hooks").HookReturn): void;
    afterBulkSync(fn: (options: import("sequelize").SyncOptions) => import("sequelize/types/hooks").HookReturn): void;
    beforeSync(name: string, fn: (options: import("sequelize").SyncOptions) => import("sequelize/types/hooks").HookReturn): void;
    beforeSync(fn: (options: import("sequelize").SyncOptions) => import("sequelize/types/hooks").HookReturn): void;
    afterSync(name: string, fn: (options: import("sequelize").SyncOptions) => import("sequelize/types/hooks").HookReturn): void;
    afterSync(fn: (options: import("sequelize").SyncOptions) => import("sequelize/types/hooks").HookReturn): void;
    hasOne<M_81 extends Model<any, any>, T_11 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_81>, target: import("sequelize").ModelStatic<T_11>, options?: import("sequelize").HasOneOptions): import("sequelize").HasOne<M_81, T_11>;
    belongsTo<M_82 extends Model<any, any>, T_12 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_82>, target: import("sequelize").ModelStatic<T_12>, options?: import("sequelize").BelongsToOptions): import("sequelize").BelongsTo<M_82, T_12>;
    hasMany<M_83 extends Model<any, any>, T_13 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_83>, target: import("sequelize").ModelStatic<T_13>, options?: import("sequelize").HasManyOptions): import("sequelize").HasMany<M_83, T_13>;
    belongsToMany<M_84 extends Model<any, any>, T_14 extends Model<any, any>>(this: import("sequelize").ModelStatic<M_84>, target: import("sequelize").ModelStatic<T_14>, options: import("sequelize").BelongsToManyOptions): import("sequelize").BelongsToMany<M_84, T_14>;
    addHook<H extends import("sequelize/types/hooks").Hooks<Model<any, any>, any, any>, K_16 extends keyof import("sequelize/types/hooks").SequelizeHooks<H["_model"], import("sequelize").Attributes<H>, import("sequelize/types/utils").MakeNullishOptional<H["_creationAttributes"]>>>(this: import("sequelize/types/hooks").HooksStatic<H>, hookType: K_16, name: string, fn: import("sequelize/types/hooks").SequelizeHooks<H["_model"], import("sequelize").Attributes<H>, import("sequelize/types/utils").MakeNullishOptional<H["_creationAttributes"]>>[K_16]): import("sequelize/types/hooks").HooksCtor<H>;
    addHook<H_1 extends import("sequelize/types/hooks").Hooks<Model<any, any>, any, any>, K_17 extends keyof import("sequelize/types/hooks").SequelizeHooks<H_1["_model"], import("sequelize").Attributes<H_1>, import("sequelize/types/utils").MakeNullishOptional<H_1["_creationAttributes"]>>>(this: import("sequelize/types/hooks").HooksStatic<H_1>, hookType: K_17, fn: import("sequelize/types/hooks").SequelizeHooks<H_1["_model"], import("sequelize").Attributes<H_1>, import("sequelize/types/utils").MakeNullishOptional<H_1["_creationAttributes"]>>[K_17]): import("sequelize/types/hooks").HooksCtor<H_1>;
    removeHook<H_2 extends import("sequelize/types/hooks").Hooks<Model<any, any>, any, any>>(this: import("sequelize/types/hooks").HooksStatic<H_2>, hookType: keyof import("sequelize/types/hooks").SequelizeHooks<H_2["_model"], import("sequelize").Attributes<H_2>, import("sequelize/types/utils").MakeNullishOptional<H_2["_creationAttributes"]>>, name: string): import("sequelize/types/hooks").HooksCtor<H_2>;
    hasHook<H_3 extends import("sequelize/types/hooks").Hooks<Model<any, any>, any, any>>(this: import("sequelize/types/hooks").HooksStatic<H_3>, hookType: keyof import("sequelize/types/hooks").SequelizeHooks<H_3["_model"], import("sequelize").Attributes<H_3>, import("sequelize/types/utils").MakeNullishOptional<H_3["_creationAttributes"]>>): boolean;
    hasHooks<H_4 extends import("sequelize/types/hooks").Hooks<Model<any, any>, any, any>>(this: import("sequelize/types/hooks").HooksStatic<H_4>, hookType: keyof import("sequelize/types/hooks").SequelizeHooks<H_4["_model"], import("sequelize").Attributes<H_4>, import("sequelize/types/utils").MakeNullishOptional<H_4["_creationAttributes"]>>): boolean;
};
export = _exports;
import { Model } from "sequelize/types/model";
